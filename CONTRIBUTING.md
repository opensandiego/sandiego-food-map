# Contributing

## Overview

To build an accessible map that provides information on San Diego County local food resources. The Food Resource map will allow users to find food distribution sites that meet their requirements (e.g: location, food distribute times, availability, and food distribution elibility).

## Meetings

Project team members meet during the regularly Open San Diego project nights. See the [Open San Diego website](https://opensandiego.org/) for more information.


# Code Submissions 
Once you volunteer to work on an issue assign yourself to the issue or ask a Project Lead to assign you to the issue.  Read the issue, request clarification of the issue, and desired outcome with Project leads. 
## Fork the Repository
Login to your GitHub account, if you have not done so already, requested access to the project repository so that you can contribute to it.  Once access has been provided to your GitHub account, create a `fork` of the https://github.com/opensandiego/sandiego-food-map/ project using GitHub's UI.

## Clone Repository
**Note:** These steps assume you are using the Command Line usage, different development tools steps may be different, but the process flow should be similar.

After successfully forking the repository on GitHub, clone the forked repository to your local development system, `git clone <GitHub repository>`. The GitHub repository will be cloned to your local development system and its initial branch should be named *master*. Use `git status` to display current branch you are on.

## Branches
If you need to keep your changes seperate from other ongoing work, it is best
to create a branch, as follows `git branch <branch name> master`.  Checkout your branch, `git checkout <branch name> and make your changes on your branch.
## Commits
Make your changes using your favorite editor, and then `commit` the changes to your local branch.  Make sure to add a meaningful commit message to your commit.

## Merge
Once your change has been completed and committed successful on your branch.  Swtich to the *master* by checking out the master, `git checkout master`.  Merge your changes into the *master*, `git merge <branch name>`.
## Push Commits
Once you are ready, `push` the commit to the remote repository on GitHub, `git push origin master`.  *origin* is the label of the remote GitHub repository, you can list the remote repositoriespointed by *origin*, using `git remomte -v`

   ## Pull Requests
Create a `Pull Request` (PR) on the upstream repository https://github.com/opensandiego/sandiego-food-map.  Enter any required information, link project issue resolved by the PR, and submit PR.

Pull Request will be reviewed, feedback may be provide, and changes requested.  After feedback or changes have been made, PR can be resubmitted, for review and accepted.

   ## Update Fork
   Refresh your forked repository to contain any changes from other pull requests.

**Note: See https://guides.github.com/activities/forking/ 

## Future
* Cypress.io - Integration of Testing Framework
* GitHub Actions - CI/CD to automate testing against browsers, and devices
* Docker - Containerizing development 
## Contact

Virtually during weekly Open San Diego meeting hosted on Discord.  On an Adhoc basis using Slack. An active Slack link can be found on our website:

***[opensandiego.org](https://opensandiego.org/)***

[CODE OF CONDUCT](/docs/Code_of_Conduct.md),  please follow during your interactions with project team members.
