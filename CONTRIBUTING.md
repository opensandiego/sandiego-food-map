# Contributing

## Overview

To build an accessible map that provides information on San Diego County local food resources. The Food Resource map will allow users to find food distribution sites that meet their requirements (e.g: location, food distribute times, availability, and food distribution elibility).

## Meetings

Project team members meet during the regularly Open San Diego project nights. See the [Open San Diego website](https://opensandiego.org/) for more information.


# Code Submissions 
Once you volunteer to work on an issue assign yourself to the issue or ask a Project Lead to assign you to the issue.  Read the issue, request clarification of the issue, and desired outcomes with Project Leads. 

## Fork the Repository
Login to your GitHub account, if you have not done so already, requested access to the project repository so that you can contribute to it.   Once access has been provied to your account create a  `fork` of the [San Diego Food Map]https://github.com/opensandiego/sandiego-food-map/ project using GitHub's UI.

## Clone Repository

**Note:** These steps assume Command Line usage, different development tools steps may be different, but the process flow should be similar.

After successfully forking the repository, clone the forked repository to your local development system, `git clone <GitHub repository>`.  The GitHub repository will be cloned to your local development system and its initial branch should be named *master*.  Use `git status` to display current branch you are on.

## Branches
If you need to keep your changes seperate from other ongoing work, it is best to create a branch, as follows `git branch <branch name>`.  Checkout your branch, `git checkout <branch name>` and make your changes on your branch. Naming convention for working branches, is topic and then the name of the topic like so: `topic-<nameOfTheTopic>`

## Commits
Make your changes using your favorite editor, and then `commit` the changes to your local branch, `git commit`, you will be prompted to enter a commit comment, ensure it is meaningful to your commit(s).

## Merge
Once your change has been completed and committed successful on your branch.  Switch to the *master* branch by checking out the master branch, `git checkout master`.  Merge your changes into the master, `git merge <your branch name>`.

## Merge with Upstream
Ensure there there are no conflicts with upstream commits, bu merge upstream changes before you push to your forked repository and before creating Pull Request to upstream.  Follow [Configure a remote for a fork] https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork , and [Syncing a fork] https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork .

## Push Commits
Once you are ready, *push* the commit to the repository on GitHub, using `git push origin master`.  *origin* is the label of the GitHub repository, you can list the remote repositories it points to using `git remote -v`

## Pull Requests
On GitHub create a new `Pull Request` (PR) on the upstream repository [San Diego Food Map]https://github.com/opensandiego/sandiego-food-map.  Select the `new pull request` button, use the **compare across forks** link. Select the drop down base repository: **opensandiego/sandiego-food-map**, base: **master**, and your head repository: **your forked repository name**, compare: **master** in most cases.  Select `create pull request`, and you should be presented with a check mark with a message "Able to merge.  These branches can be automatically merged." 

Pull Request may be reviewed, feedback may be provide, and changes requested.  After feedback or changes have been made, PR can be resubmitted, for review and accepted.

Also, for work in progress, please work on your own forks, before the feature is done and before you open a pull request.
In certain cases, if you really need a code review and hence have to open a pull request, however your feature is still a work in progress, write **“WORK IN PROGRESS!!”** in the commit message and the pull request message. This way we will not merge your branch into the master branch.

## Update Fork
Refresh your forked repository to contain any changes from other pull requests.

## Future
* Cypress.io - Integration of Testing Framework
* GitHub Actions - CI/CD to automate testing against browsers, and devices
* Docker - Containerizing development 
## Contact

Virtually during weekly Open San Diego meeting hosted on Discord.  On an Adhoc basis using Slack. An active Slack link can be found on our website:

***[opensandiego.org](https://opensandiego.org/)***

[CODE OF CONDUCT](/docs/Code_of_Conduct.md),  please follow during your interactions with project team members.
