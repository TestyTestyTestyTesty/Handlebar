let form = document.getElementById("sorting");
let filter = document.getElementById("filter");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://testytestytestytesty.github.io/jsonData/pets.json');
ourRequest.onload = function() {
    var data = JSON.parse(ourRequest.responseText);
    const cats = JSON.parse(JSON.stringify(data));
    const dogs = JSON.parse(JSON.stringify(data));
    form.addEventListener("change", sorting);
    filter.addEventListener("change", filtering);
    data.pets.sort((a, b) => parseFloat(b.birthYear) - parseFloat(a.birthYear));
    createHTML(data);

    function filtering() {
        if (filter.value === 'cats') {
            let pets = cats.pets.filter(el =>{
                return (el.species == "Cat");
            });
            cats.pets = pets;
            createHTML(cats);
        }else if(filter.value === 'dogs') {

            let pets = dogs.pets.filter(el =>{
                return (el.species == "Dog");
            });
            dogs.pets = pets;
            createHTML(dogs);
        }
        if (filter.value === 'default') {
            createHTML(data);
        }
    }
    function sorting() {
        if (form.value === 'byYearsASC') {
            data.pets.sort((a, b) => (b.birthYear) - (a.birthYear));
            createHTML(data);
        }else if(form.value === 'byYearsDESC') {
            //sort by years DESC
            data.pets.sort((a, b) => (a.birthYear) - (b.birthYear));
            createHTML(data);
        }else if(form.value === 'byNameASC') {
            //sort by years DESC
            data.pets.sort((a,b) => (a.name) > (b.name));
            createHTML(data);
        }else if(form.value === 'byNameDESC') {
            //sort by years DESC
            data.pets.sort((a,b) => (a.name) < (b.name));
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
