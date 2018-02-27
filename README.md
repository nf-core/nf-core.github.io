# ![nf-core](assets/logo/nf-core-logo.png)
# https://nf-core.github.io

[**nf-core**](https://github.com/nf-core) is a GitHub organisation containing a curated set of analysis pipelines built using nextflow - a tool and language that can be used for highly scalable and portable workflows.

This repository contains the files used to generate the documentation website for nf-core: https://nf-core.github.io/

The website uses [GitHub Pages](https://pages.github.com/) with the [Cayman theme](https://github.com/pages-themes/cayman). There are a few customisations to override parts of the default template (see `_layouts` and `assets/css`).
Under the hood, the website files are being dynamically generated using [Jekyll](https://jekyllrb.com/).

If you prefer, you can read all of the website content on GitHub.com instead:

* [Homepage](index.md)
* [Pipelines](pipelines.md)
* [Docs](docs.md)
* [About](about.md)

Otherwise, head over to https://nf-core.github.io and enjoy!

## Contributing to nf-core.github.io

If you want to contribute to nf-core's documentation, it would be awesome to render the websites on your local fork accordingly, before submitting a pull request.

The underlying site generator is [Jekyll](https://jekyllrb.com/), which uses [Liquid](http://shopify.github.io/liquid/) as template engine.

Please check the GitHub's [documentation](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) on how to setup Jekyll for GitHub Pages.

In short, to get started:

1. Ensure you have Ruby installed _(we recommend using [rbenv](https://github.com/rbenv/rbenv) on OSX)_
2. Install bundler: `gem install bundler`
3. Fork and clone this repository
4. Go to the repository folder and run `bundle install`

Once you've done this, you just need to go to the repository directory and run the webserver:
```
bundle exec jekyll serve
```
