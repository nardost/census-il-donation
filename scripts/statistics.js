const statistics = ["S1602", "S2201", "S2301", "B02001", "B1601"]

function description(statistic) {
    switch(statistic) {
        case "S1602":
            return "Limited English Speaking Households";
        case "S2201":
            return "Households Receiving Food Stamp /SNAP";
        case "S2301":
            return "Employment Status";
        case "B02001":
            return "Racial Makeup";
        case "B1601":
            return "Educational Attainment";
        default:
            return "";
    }
}

function getStatistic(statistic, data, total) {
    let keys = []
    if(statistic == 'B02001') {
        keys = ["total_population","white","black_or_african_american","american_indian_and_alaska_native","asian","hawaiian_and_other_pacific_islander","other","two_or_more","two_or_more_including_other","two_or_more_excluding_other_and_three_or_more"] 
    } else if(statistic == 'S1602') {
        keys = ["total_households","limited_english_speaking","percent_limited_english_speaking"]
    } else if(statistic == "B1601") {
        keys = ["B1601_estimated_total", "less_than_highschool", "highschool_graduate", "some_college_or_associate_degree", "bachelors_degree_or_higher"]
        //keys = ["B16010_estimated_total","less_than_highschool","less_than_highschool_in_labor_force","less_than_highschool_in_labor_force_english_only","less_than_highschool_in_labor_force_speak_spanish","less_than_highschool_in_labor_force_speak_other_indoeuropean","less_than_highschool_in_labor_force_speak_asian_pacific_island","less_than_highschool_in_labor_force_speak_other","less_than_highschool_not_in_labor_force","less_than_highschool_not_in_labor_force_english_only","less_than_highschool_not_in_labor_force_speak_spanish","less_than_highschool_not_in_labor_force_speak_other_indoeuropean","less_than_highschool_not_in_labor_force_speak_asian_pacific_island","less_than_highschool_not_in_labor_force_speak_other","highschool_graduate","highschool_graduate_in_labor_force","highschool_graduate_in_labor_force_english_only","highschool_graduate_in_labor_force_speak_spanish","highschool_graduate_in_labor_force_speak_other_indoeuropean","highschool_graduate_in_labor_force_speak_asian_pacific_island","highschool_graduate_in_labor_force-speak_other","highschool_graduate_not_in_labor_force","highschool_graduate_not_in_labor_force_english_only","highschool_graduate_not_in_labor_force_speak_spanish","highschool_graduate_not_in_labor_force_speak_other_indoeuropean","highschool_graduate_not_in_labor_force_speak_asian_pacific_island","highschool_graduate_not_in_labor_force_speak_other","some_college_or_associate_degree","some_college_or_associate_degree_in_labor_force","some_college_or_associate_degree_in_labor_force_english_only","some_college_or_associate_degree_in_labor_force_speak_spanish","some_college_or_associate_degree_in_labor_force-speak_other_indoeuropean","some_college_or_associate_degree_in_labor_force_speak_asian_pacific_island","some_college_or_associate_degree_in_labor_force_speak_other","some_college_or_associate_degree_not_in_labor_force","some_college_or_associate_degree_not_in_labor_force_english_only","some_college_or_associate_degree_not_in_labor_force_speak_spanish","some_college_or_associate_degree_not_in_labor_force_speak_other_indoeuropean","some_college_or_associate_degree_not_in_labor_force_speak_asian_pacific_island","some_college_or_associate_degree_not_in_labor_force_speak_other","bachelors_degree_or_higher","bachelors_degree_or_higher_in_labor_force","bachelors_degree_or_higher_in_labor_force_english_only","bachelors_degree_or_higher_in_labor_force_speak_spanish","bachelors_degree_or_higher_in_labor_force_speak_other_indoeuropean","bachelors_degree_or_higher_in_labor_force_speak_asian_pacific_island","bachelors_degree_or_higher_in_labor_force_speak_other","bachelors_degree_or_higher_not_in_labor_force","bachelors_degree_or_higher_not_in_labor_force_english_only","bachelors_degree_or_higher_not_in_labor_force_speak_spanish","bachelors_degree_or_higher_not_in_labor_force_speak_other_indoeuropean","bachelors_degree_or_higher_not_in_labor_force_speak_asian_pacific_island","bachelors_degree_or_higher_not_in_labor_force_speak_other"]
    } else if(statistic == "S2201") {
        keys = ["receiving_foodstamp", "total_households"]
    } else if(statistic == "S2301") {
        keys = ["total_16_and_over","labor_force_participation_rate","employment_pupulation_ratio","unemployment_rate"]
    }
    let row = []
    for(let i in data) {
        if(keys.includes(i) && i != total && i != 'id') {

            if(statistic == "S2201")
            {
                let element = {category: i, value: (+data[i])}
                row.push(element)
            }
            else
            {
                //let element = {category: i, value: (+data[i] / total) * 100}
                //row.push(element)
                let element = {category: i, value: (+data[i] / +data[total]) * 100}
                row.push(element)
            }
        }
    }
    return row;
}
function buildS2201CategoricalData(summary) {
    let categorical = [
       // { category: 'Households', value: (summary.households) }  
         { category: 'Households', value: ((summary.households  * 100 ) / summary.total_households) }    
        ]
    return categorical;
}
function summarizeStatistics(features, statistic) {
    switch(statistic) {
        case "S1602":
            return summarizeS1602Statistics(features);
        case "S2201":
            return summarizeS2201Statistics(features);
        case "S2301":
            return summarizeS2301Statistics(features);
        case "B02001":
            return summarizeB02001Statistics(features);
        case "B1601":
            return summarizeB16010Statistics(features);
        default:
            return null;
    }
}

function summarizeS1602Statistics(features) {

}
function summarizeS2201Statistics(features) {
    let totalPupulation = 0;
    let households = 0;

    features.forEach(e => {
        let d = e.properties.data;
        totalPupulation += +d.total_households
        households += +d.receiving_foodstamp 
        console.log(d.total_households);
       
    });
    let summary = {
        totalPupulation: totalPupulation,
        households: households,
    }
    return summary;
}
function summarizeS2301Statistics(features) {

}
function summarizeB02001Statistics(features) {
    let totalPupulation = 0;
    let totalWhite = 0;
    let totalBlack = 0;
    let totalIndian = 0;
    let totalAsian = 0;
    let totalHawaiian = 0;
    let totalOther = 0;
    let totalTwoOrMore = 0;
    let totalTwoOrMoreIncludingOther = 0;
    let totalTwoOrMoreExcludingOtherAndThreeOrMore = 0;
    features.forEach(e => {
        let d = e.properties.data;
        totalPupulation += +d.total_population
        totalWhite += +d.white
        totalBlack += +d.black_or_african_american
        totalIndian += +d.american_indian_and_alaska_native
        totalAsian += +d.asian
        totalHawaiian += +d.hawaiian_and_other_pacific_islander
        totalOther += +d.other
        totalTwoOrMore += +d.two_or_more
        totalTwoOrMoreIncludingOther += +d.two_or_more_including_other
        totalTwoOrMoreExcludingOtherAndThreeOrMore += +d.two_or_more_excluding_other_and_three_or_more
        
    });
    let summary = {
        totalPupulation: totalPupulation,
        totalWhite: totalWhite,
        totalBlack: totalBlack,
        totalIndian: totalIndian,
        totalAsian: totalAsian,
        totalHawaiian: totalHawaiian,
        totalOther: totalOther,
        totalTwoOrMore: totalTwoOrMore,
        totalTwoOrMoreIncludingOther: totalTwoOrMoreIncludingOther,
        totalTwoOrMoreExcludingOtherAndThreeOrMore: totalTwoOrMoreExcludingOtherAndThreeOrMore
    }
    return summary;
}
function summarizeB16010Statistics(features) {
    let totalPupulation = 0;
    let totalLessHighSchool = 0;
    let totalHighSchool = 0;
    let totalAssociate = 0;
    let totalBechelors = 0;
    features.forEach(e => {
        let d = e.properties.data;
        totalPupulation += +d.B1601_estimated_total
        totalLessHighSchool+= +d.less_than_highschool
        totalHighSchool += +d.highschool_graduate
        totalAssociate += +d.some_college_or_associate_degree
        totalBechelors += +d.bachelors_degree_or_higher
    });
    let summary = {
        totalPupulation: totalPupulation,
        totalLessHighSchool: totalLessHighSchool,
        totalHighSchool: totalHighSchool,
        totalAssociate: totalAssociate,
        totalBechelors: totalBechelors
    }
    return summary;
}

function buildB02001CategoricalData(summary) {
    let categorical = [
        { category: 'Whites', value: (summary.totalWhite / summary.totalPupulation) * 100 },
        { category: 'Blacks', value: (summary.totalBlack / summary.totalPupulation) * 100 },
        { category: 'Natives', value: (summary.totalIndian / summary.totalPupulation) * 100 },
        { category: 'Asians', value: (summary.totalAsian / summary.totalPupulation) * 100 },
        { category: 'Hawaiians', value: (summary.totalHawaiian / summary.totalPupulation) * 100 },
        { category: 'Other', value: (summary.totalOther / summary.totalPupulation) * 100 },
        { category: 'Two or More', value: (summary.totalTwoOrMore / summary.totalPupulation) * 100 },
        { category: '>= 2 + Other', value: (summary.totalTwoOrMoreIncludingOther / summary.totalPupulation) * 100 },
        { category: '>= 2 - Other & >=3', value: (summary.totalTwoOrMoreExcludingOtherAndThreeOrMore / summary.totalPupulation) * 100 }
    ]
    return categorical
}

function buildB16010CategoricalData(summary) {
    let categorical = [
        { category: 'Less than high school', value: (summary.totalLessHighSchool / summary.totalPupulation) * 100 },
        { category: 'High school', value: (summary.totalHighSchool / summary.totalPupulation) * 100 },
        { category: 'Some college or associate degree', value: (summary.totalAssociate / summary.totalPupulation) * 100 },
        { category: 'Bachelors degree or higher', value: (summary.totalBechelors / summary.totalPupulation) * 100 }
    ]
    return categorical
}

function getAllTractsInCounty(countyFIPS, features) {
    let tracts = [];
    features.forEach(tract => {
        let id = tract.id
        if(id.slice(2, 5) == countyFIPS) {
            tracts.push(id)
        }
    })
    return tracts
}

function countySummary(countyFIPS, statistic, features) {
    let tractsInCounty = getAllTractsInCounty(countyFIPS, features)
    let summary = 0;
    if(statistic ==  'B1601') {
        //return percentage of bachelors degree or higher in county
        let tracts = []
        tractsInCounty.forEach(i => {
            let tract = getTractById(i, features)
            tracts.push(tract)
        })
        let total = 0;
        let bachelors = 0;
        tracts.forEach(t => {
            total += +t.properties.data.B1601_estimated_total
            bachelors += +t.properties.data.bachelors_degree_or_higher
        })
        summary = Math.floor((bachelors / total) * 100)
        return summary
    }
    return summary
}

function aggregateCountySummary(statistic, features) {
    let aggregated = []
    COUNTY_FIPS_IL.forEach(c => {
        aggregated.push(countySummary(c, statistic, features))
    })
    return aggregated
}

function getTractById(id, features) {
    let tract = null
    features.forEach(t => {
        if(t.id == id) { tract = t }
    })
    return tract;
}
function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
}