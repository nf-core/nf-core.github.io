/*
 * Custom JavaScript for nf-core.github.io
*/

var github_org = 'nf-core';

$(function() {
    // Table of contents styling
    if ( $("#markdown-toc").length ) {
        $(".main-content").addClass('has-toc');
        // Fix the nav position when we scroll
        $(window).scroll(function () {
            if ($(window).scrollTop() >= $('.site-logo').innerHeight() + $('.page-header').innerHeight() + 26) {
                $('#markdown-toc').addClass('fixed');
            } else {
                $('#markdown-toc').removeClass('fixed');
            }
        });
    }

    // List available pipelines
    if ($('body').hasClass('page-pipelines')){

        // NOTE: Currently limited to 100 repositories, need proper pagination for more
        var org_api_url = "https://api.github.com/orgs/"+github_org+"/repos?per_page=100";
        var repos_ignore = ['cookiecutter', 'tools', 'nf-core.github.io', 'logos', 'test-datasets'];
        var repos_prod = [];
        var repos_dev = [];
        var repos_archived = [];

        // TODO: Have another section for archived repositories
        $.getJSON(org_api_url, function(repos) {
            var promises = [];
            $.each(repos, function(idx, repo){
                if(repos_ignore.indexOf(repo.name) == -1){
                    // Pipeline is archived
                    // NB: If we have *only* archived pipelines, page won't render. Seems unlikely though..!
                    if(repo.archived){
                        repos_archived.push(repo);
                    } else {
                        var releases_api_url = "https://api.github.com/repos/"+repo.full_name+"/releases";
                        // Call the API endpoint to get information about releases
                        var jqxhr = $.getJSON(releases_api_url).done(function(releases) {
                            // Filter out prereleases and draft releases
                            releases = $.grep(releases, function (el, i) {
                                if(el.prerelease || el.draft) return false;
                                else return true;
                            });
                            // Add to the repo object to access this later
                            repo.releases = releases;
                            // We have some releases - production pipeline
                            if(repo.releases.length > 0){
                                repos_prod.push(repo);
                            }
                            // No releases - pipeline in development
                            else {
                                repos_dev.push(repo);
                            }
                        });
                        // Save this ajax promise so we can trigger code when it's done
                        promises.push(jqxhr);
                    }
                }
            });

            // Wait for all of the release ajax calls to finish
            $.when.apply($, promises).done(function(){

                // Sort the lists of pipelines
                repos_prod.sort(sort_pipelines);
                repos_dev.sort(sort_pipelines);
                repos_archived.sort(sort_pipelines);

                // Production grade pipelines
                if(repos_prod.length > 0){
                    var repo_lis = [];
                    $.each(repos_prod, function(idx, repo){
                        repo_lis.push(make_pipeline_li(repo));
                    });
                    $('<ul/>', {
                        id: 'nf-core-repos-prod',
                        class: 'nf-core-pipelines-list',
                        html: repo_lis.join('')
                    }).appendTo('#production_pipelines');
                    $('#production_pipelines').show();
                }

                // Pipelines under development
                if(repos_dev.length > 0){
                    var repo_lis = [];
                    $.each(repos_dev, function(idx, repo){
                        repo_lis.push(make_pipeline_li(repo));
                    });
                    $('<ul/>', {
                        id: 'nf-core-repos-dev',
                        class: 'nf-core-pipelines-list',
                        html: repo_lis.join('')
                    }).appendTo('#development_pipelines');
                    $('#development_pipelines').show();
                }

                // Archived pipelines
                if(repos_archived.length > 0){
                    var repo_lis = [];
                    $.each(repos_archived, function(idx, repo){
                        repo_lis.push(make_pipeline_li(repo));
                    });
                    $('<ul/>', {
                        id: 'nf-core-repos-archived',
                        class: 'nf-core-pipelines-list',
                        html: repo_lis.join('')
                    }).appendTo('#archived_pipelines');
                    $('#archived_pipelines').show();
                }

                // Show the page content
                $('#pipelines_content').slideDown();
                $('#pipelines_loading').slideUp();

            });
        }).fail(function(e) {
            console.error("Cannot query GitHub API:", e.responseJSON);
            $('#pipelines_loading').html(
                'Oops - there was a problem querying the GitHub API, sorry! <br>' +
                'Please try again later, or <a href="https://github.com/nf-core/nf-core.github.io/issues">let us know</a>.'
            );
        });
    }
});

function sort_pipelines(a,b) {
  if (a.full_name.toLowerCase() < b.full_name.toLowerCase()) return -1;
  if (a.full_name.toLowerCase() > b.full_name.toLowerCase()) return 1;
  return 0;
}

function make_pipeline_li(repo){
    var description = '';
    if('description' in repo && repo.description){
        description = '<p class="repo_description">'+repo.description+'</p> ';
    }
    var latest_release = '';
    if('releases' in repo && repo.releases.length > 0){
        latest_release = '<p class="latest-release pipeline-badge" title="'+repo.releases[0].name+'">'+repo.releases[0].tag_name+'</p>';
    }
    var archived = '';
    if('archived' in repo && repo.archived && 'pushed_at' in repo){
        pushed_at_date = repo.pushed_at.substring(0, repo.pushed_at.indexOf('T'));
        archived = '<p class="archived-lastpush pipeline-badge">Last update: <span>'+pushed_at_date+'</span></p>';
    }
    var stargazers = '';
    if('stargazers_count' in repo){
        stargazers += '<a href="'+repo.stargazers_url+'" class="stargazers_count"><i class="far fa-star"></i> ' + repo.stargazers_count + '</a>';
    }
    return '<li id="repo_'+repo.id+'">' +
        '<h3 class="repo_name"><a href="'+repo.html_url+'">'+repo.full_name+'</a></h3> ' +
        description +
        latest_release +
        archived +
        stargazers +
    '</li>';
}
