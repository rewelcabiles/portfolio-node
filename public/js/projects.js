var all_projects = [];
var to_display = [];

var all_tags = [];
var current_tag;
var current_card;


var project_dict = {}
fetch("/api/projects")
  .then(function(response) {
    return response.json()
}).then((data) => {
    // store project name from data into all_projects
    for (var i = 0; i < data.length; i++) {
        data[i].name = data[i].name.replace(/\s/g, "_")
        all_projects.push(data[i])
        project_dict[data[i].name] = data[i]
    }
    current_card = document.getElementById("card-"+all_projects[0].safe_name)
    showProject(all_projects[0].safe_name)
})

fetch("/api/project_tags")
  .then(function(response) {
    return response.json()
}).then((data) => {
    all_tags = data
    console.log(all_tags)
})

function tagClicked(tag) {
    current_tag = tag
    to_display = []

    var tag_show =  document.getElementById("tag_show")
    tag_show.innerHTML = 'Showing ' + tag;
    if (tag == "All") {
        //iterate through all_projects
        for (var i = 0; i < all_projects.length; i++) {
            to_display.push(all_projects[i].name)
        }
        console.log(to_display)
    } else {
        for (var i = 0; i < all_projects.length; i++) {
            if (all_projects[i].tags.includes(tag)) {
                to_display.push(all_projects[i].name)
            }
        }
    }
    var projects_container = document.getElementById("projects_container")
    // iterate through projects_container children
    for (var i = 0; i < projects_container.children.length; i++) {
        //if child id is in to_display
        if (to_display.includes(projects_container.children[i].id)) {
            // show child
            projects_container.children[i].style.display = "grid"
        } else {
            // hide child
            projects_container.children[i].style.display = "none"
        }
    }

}

//import from cd

//get first child of projects_container
var converter = new showdown.Converter();
converter.setFlavor('github');

function showProject(project_name) {
    projectCard = document.getElementById('card-'+project_name)
    projectDesc = document.getElementById('desc-'+project_name)

    projectLatestCommit = document.getElementById('latest-commit-'+project_name)
    projectLatestCommitAuthor = document.getElementById('latest-commit-'+project_name+'-author')
    projectLatestCommitDate = document.getElementById('latest-commit-'+project_name+'-date')


    project_link = project_dict[project_name].projectLink
    project_link_name = project_link.split("/")[project_link.split("/").length-1];
    project_link_auth = project_link.split("/")[project_link.split("/").length-2];
    api_link = "https://api.github.com/repos/"+project_link_auth+"/"+project_link_name+"/commits?per_page=1"

    fetch(api_link).then(function(response) {
        return response.json()
    }).then((data) => {
        console.log("z")
        if (data.length > 0) {
            console.log("A")
            latest_commit = data[0]

            projectLatestCommit.innerHTML = latest_commit.commit.message
            projectLatestCommitAuthor.innerHTML = latest_commit.commit.author.name
            projectLatestCommitDate.innerHTML =  latest_commit.commit.author.date.split("T")[0]
        }
    })


    current_card.style.display = "none";
    projectCard.style.display = "grid"

    projectDesc.innerHTML =converter.makeHtml(project_dict[project_name].description);

    current_card = projectCard
}

// Get all elements with the class is_markdown
var markdown_elements = document.getElementsByClassName("is_markdown");
for (var i = 0; i < markdown_elements.length; i++) {
    markdown_elements[i].innerHTML = converter.makeHtml(markdown_elements[i].innerHTML);
}

// .replace(/\s/g, "_")

