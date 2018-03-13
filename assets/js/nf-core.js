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
    if ($("meta[property='og:title']").attr("content") == 'Available Pipelines'){
        // TODO: Currently only gets 100 projects, need proper pagination
        var org_api_url = "https://api.github.com/orgs/"+github_org+"/repos?per_page=100";
        var repos_ignore = ['cookiecutter', 'tools', 'nf-core.github.io', 'logos', 'test-datasets'];
        var repos_prod = [];
        var repos_dev = [];
        $.getJSON(org_api_url, function(repos) {
            var promises = [];
            $.each(repos, function(idx, repo){
                if(repos_ignore.indexOf(repo.name) == -1){
                    var releases_api_url = "https://api.github.com/repos/"+repo.full_name+"/releases";
                    // Call the API endpoint to get information about releases
                    var jqxhr = $.getJSON(releases_api_url).done(function(releases) {
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
            });
            // Wait for all of the release ajax calls to finish
            $.when.apply($, promises).done(function(){

                // Production grade pipelines
                if(repos_prod.length > 0){
                    var repo_lis = [];
                    $.each(repos_prod, function(idx, repo){
                        repo_lis.push(
                            '<li id="repo_'+repo.id+'">' +
                                '<a href="'+repo.html_url+'">'+repo.full_name+'</a> ' +
                                '<span class="latest-release">'+repo.releases[0].tag_name+'</span>' +
                            '</li>'
                        );
                        console.log('releases 2', repo.name, repo.releases, repo, JSON.parse(JSON.stringify(repo)));
                    });
                    $('<ul/>', {
                        id: 'nf-core-repos-prod',
                        class: 'nf-core-pipelines-list',
                        html: repo_lis.join('')
                    }).appendTo('#production_pipelines');
                } else {
                    $('#production_pipelines').hide();
                }

                // Pipelines under development
                if(repos_dev.length > 0){
                    var repo_lis = [];
                    $.each(repos_dev, function(idx, repo){
                        repo_lis.push(
                            '<li id="repo_'+repo.id+'">' +
                                '<a href="'+repo.html_url+'">'+repo.full_name+'</a>' +
                            '</li>'
                        );
                    });
                    $('<ul/>', {
                        id: 'nf-core-repos-dev',
                        class: 'nf-core-pipelines-list',
                        html: repo_lis.join('')
                    }).appendTo('#development_pipelines');
                } else {
                    $('#development_pipelines').hide();
                }

            });
        }).fail(function(e) {
            console.error("Cannot query GitHub API:", e.responseJSON);
            $('#production_pipelines').html('<p><em>Oops - there was a problem querying the GitHub API, sorry!</em></p');
            $('#development_pipelines').hide();
        });
    }
});
