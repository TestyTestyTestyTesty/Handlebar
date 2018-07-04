let form = document.getElementById("sorting");
let filter = document.getElementById("filter");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://testytestytestytesty.github.io/jsonData/pets.json');
ourRequest.onload = function() {
    var data = JSON.parse(ourRequest.responseText);
    form.addEventListener("change", sorting);
    filter.addEventListener("change", filtering);
    data.pets.sort((a, b) => parseFloat(b.birthYear) - parseFloat(a.birthYear));
    createHTML(data);

    function filtering() {
        if (filter.value === 'cats') {
            const cats = JSON.parse(JSON.stringify(data));
            console.log(cats.pets);
            let x = cats.pets.filter(el =>{
                return (el.species == "Cat");
            });
            createHTML(cats);
        }else if(filter.value === 'dogs') {
            let dogs = data.pets.filter(el =>{
                return (el.species == "Dog");
            });
            createHTML(dogs);
        }
        if (filter.value === 'default') {
            console.log(data);
            createHTML(data);
        }
    }
    function sorting() {
        if (form.value === 'byYearsASC') {
            data.pets.sort((a, b) => parseFloat(b.birthYear) - parseFloat(a.birthYear));
            createHTML(data);
        }else if(form.value === 'byYearsDESC') {
            //sort by years DESC
            data.pets.sort((a, b) => parseFloat(a.birthYear) - parseFloat(b.birthYear));
            createHTML(data);
        }else if(form.value === 'byNameASC') {
            //sort by years DESC
            data.pets.name.sort();
            createHTML(data);
        }
    }
};
ourRequest.send();

Handlebars.registerHelper("calculateAge", function(birthYear) {
    let age = new Date().getFullYear() - birthYear;
    if (age < 1) {
        return 'less than a year old'
    }
    return age + " years old";
});


function createHTML(petsData) {
    let rawTemplate = document.getElementById("petsTemplate").innerHTML;
    let compiledTemplate = Handlebars.compile(rawTemplate);
    let generatedHTML = compiledTemplate(petsData);

    let petsContainer = document.getElementById("pets-container");
    petsContainer.innerHTML = generatedHTML;
}
