var all_projects = [];
var to_display = [];

var all_tags = [];
var current_tag;

fetch("/api/projects")
  .then(function(response) {
    return response.json()
}).then((data) => {
    // store project name from data into all_projects
    for (var i = 0; i < data.length; i++) {
        data[i].name = data[i].name.replace(/\s/g, "_")
        all_projects.push(data[i])
    }

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

var current_card = document.getElementById("base-card")

function showProject(project_name) {
    projectCard = document.getElementById('card-'+project_name)
    current_card.style.display = "none";
    projectCard.style.display = "grid"
    current_card = projectCard
}

// .replace(/\s/g, "_")

