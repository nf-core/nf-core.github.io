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

## Forking and local development of nf-core.github.io

If you want to contribute to nf-core's documentation, it would be awesome to render the websites on your local fork accordingly, before submitting a pull request.

The underlying site generator is [Jekyll](https://jekyllrb.com/), which uses [Liquid](http://shopify.github.io/liquid/) as template engine.

### Basic setup

First, make sure you have installed `ruby`, `git` and some gems. Please check out how to install ruby and git on your OS for yourself (example shows the Arch Linux way).

```
# Arch Linux ruby installation
sudo pacman -S ruby git
gem install jekyll jekyll-theme-cayman
```

Be sure you have `~/.gem/ruby/.../bin` in your PATH environmental variable, otherwise the jekyll executable will not be found.

### Clone your fork of nf-core.github.io

First, [fork](https://help.github.com/articles/fork-a-repo/) the original repository on GitHub. Then clone the fork on your OS:

```
# Clone using SSH
git clone git@github.com:<your-profile>/nf-core.github.io.git
# Clone using HTTPS
https://github.com/<your-profile>/nf-core.github.io.git
```

### Build pages

Now `cd` in your git repository and build the pages:

```
jekyll build
```

You should now see a `_site` directory, that has been created by Jekyll. This is where the converted files are hosted. Now start a local web server instance to see the rendered website:

```
jekyll serve
```

The default address usually is `http://127.0.0.1:4000`. Type it in your browser's address bar and check the result.
