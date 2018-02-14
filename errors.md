---
layout: default
---

# Linting Errors

This page contains detailed descriptions of the tests done by the [nf-core/tools](https://github.com/nf-core/tools) package. Linting errors should show URLs next to any failures that link to the relevant heading below.

## <a name="1"></a>Error #1 - File not found
nf-core pipelines should adhere to a common file structure for consistency. The lint test looks for the following required files:

* `nextflow.config`
    * The main nextflow config file
* `Dockerfile`
    * A docker build script to generate a docker image with the required software
* `LICENSE`
    * The MIT licence. Copy from [here](https://raw.githubusercontent.com/nf-core/tools/master/LICENSE).
* `README.md`
    * A well written readme file in markdown format
* `CHANGELOG.md`
    * A markdown file listing the changes for each pipeline release
* `docs/README.md`, `docs/output.md`, `docs/usage.md`
    * A `docs` directory with an index `README.md`, usage and output documentation

The following files are suggested but not a hard requirement. If they are missing they trigger a warning:

* `main.nf`
    * It's recommended that the main workflow script is called `main.nf`
* `conf/base.config`
    * A `conf` directory with at least one config called `base.config`
* `tests/run_test.sh`
    * A bash script to run the pipeline test run
