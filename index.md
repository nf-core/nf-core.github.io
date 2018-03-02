---
layout: default
---

# Curated nextflow pipelines
[**nf-core**](https://github.com/nf-core) is a community effort to collect a curated set of analysis pipelines built using [Nextflow](https://www.nextflow.io/): a workflow manager that can be used for highly scalable and portable workflows.

Nextflow is an incredibly flexible and powerful tool. Like any tool, it comes with a learning curve. Here, we have collected a number of pipelines written using Nextflow that all adhere to a set of "best practice" guidelines. This means that if one pipeline works on your system, then they all should.

These pipelines can be used as they are, can be used as inspiration, or can be used as a starting point for something different. Everything is released with the MIT licence, so you're free to use the code however you would like.

## Pipeline Features
The pipelines you'll find here are typically targeted towards general-use applications. The hope is that by working together we can create a better resource for everyone.

To be included, every pipeline must come with the following features:

* Built using Nextflow
* An [MIT licence](https://choosealicense.com/licenses/mit/)
* Software bundled using [Docker](https://www.docker.com/) and [Singularity](http://singularity.lbl.gov/)
* Include a minimal test dataset and a configuration profile named `test`
* Continuous integration testing
* Stable release tags
* Common pipeline structure and usage
* Excellent documentation

Note that tagged pipeline code and software containers means that you can rerun an older version of the pipeline and get _exactly_ the same results.

For bonus points, it's recommended that pipelines have (in addition to above):

* Software bundled using [bioconda](https://bioconda.github.io/)
* Explicit support for running in cloud environments (eg. use of [AWS-iGenomes](https://ewels.github.io/AWS-iGenomes/))
* Benchmarks from running on cloud environments such as [AWS](https://aws.amazon.com/)

Want to add a new pipeline to the collection? Head over to the [documentation](docs) to see how.

## How to use a pipeline

1. [Find a pipeline](pipelines) that you want to use
2. Follow the link to that repository
3. Read the usage documentation
4. Check that you have all of the requirements on your system
    * eg. Nextflow + Singularity + data
5. Run the pipeline command (everything should be downloaded automatically)
6. Wait for the analysis to complete, and celebrate!

## Credits
This project was originally created by [Phil Ewels](http://phil.ewels.co.uk/), but there are loads of people involved! Check out the [About](about) page to see a list of participating people and institutions.
