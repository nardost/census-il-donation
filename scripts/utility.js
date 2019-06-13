function existsInList(entry, list) {
    for(let i in list) {
        if(list[i].category == entry.category && list[i].value == entry.value) {
        return true;
        }
    }
    return false;
}
function linkExists(link, links) {
    for (let i in links) {
        if (links[i].source == link.source && links[i].target == link.target) {
            return true;
        }
    }
    return false;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function sortJsonArray(list, field) {
    return list.sort((a, b) => {
        return +a[field] - +b[field]
    });
}

function reverseSortJsonArray(list, field) {
    return list.sort((a, b) => {
        return +b[field] - +a[field]
    });
}

function min(array) {
    return Math.min(...array);
}
function max(array) {
    return Math.max(...array);
}
function maxOfField(list, field) {
    let values = []
    for(let i in list) {
        values.push(list[i][field])
    }
    return max(values)
}
function minOfField(list, field) {
    let values = []
    for(let i in list) {
        values.push(list[i][field])
    }
    return min(values)
}
function prettifyLabel(statistic, label) {
    if(statistic == 'B02001') {
        if(label == 'total_population') return 'Total'
        if(label == 'white') return 'White'
        if(label == 'black_or_african_american') return 'Black/Afr...'
        if(label == 'american_indian_and_alaska_native') return 'Native'
        if(label == 'hawaiian_and_other_pacific_islander') return 'Hawaiian'
        if(label == 'two_or_more') return '2 or More'
        if(label == "two_or_more_excluding_other_and_three_or_more") return '>2 -Other & >3'
        if(label == "two_or_more_including_other") return '>2 +Other'
        if(label == "asian") return 'Asian'
        return label
    }
    if(statistic == 'B1601') {
        if(label == 'B1601_estimated_total') return 'Total'
        if(label == 'less_than_highschool') return 'Less Than Highschool'
        if(label == 'highschool_graduate') return 'Highschool Graduate'
        if(label == 'some_college_or_associate_degree') return 'Some College/Associate Degree'
        if(label == 'bachelors_degree_or_higher') return '>=Bachelors Degree'
        return label
    }
    let str = label.replace(/_/g, " ").toUpperCase()
    return str;
}
function buildGraphData(list, average) {
    /* expects an array of { category: category, value: value } */
    let nodes = list
    let links = []
    let graph = { nodes: nodes }
    let link = {}
    for(let i in list) {
        for(let j in list) {
            if (i != j) {
                if ((list[i].value >= average && list[j].value >= average) || (list[i].value < average && list[j].value < average)) {
                    let link = { source: list[i].category, target: list[j].category, value: (list[i].value >= average && list[j].value >= average) }
                    if(!linkExists(link, links)) links.push(link)
                    link = { source: list[j].category, target: list[i].category, value: (list[i].value >= average && list[j].value >= average) }
                    if (!linkExists(link, links)) links.push(link)
                }
            }
        }
    }
    graph.links = links
    return graph
}
