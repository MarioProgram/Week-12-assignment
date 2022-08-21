
function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1); //capitalize the first letter on string for better presentation
  }
  
  
let urlSearch //used in other parts of code. applied here to be global

class Search {
    constructor() {
        this.addBtn = $('#sub')
        this.searchBar = $('#search')
        this.select = $('#selector')
    }
    start() {
        urlSearch = 'https://pokeapi.co/api/v2/pokemon/' + this.searchBar.val().toLocaleLowerCase(); //makes urlSearch variable the api link to the pokemon and lowervases it so search is not case sensitive
        $.ajax({
            url: urlSearch,
            dataType: "json",
            success: (data) => {
                let selector = checker.slide(parseInt(this.select.val())) //checks which option is chosen next to the search bar to put in the pokemon information in the chosen slot also is used to as an argument in functions
                $(`#${selector}photo`).attr('src', data.sprites.front_default); // finds photo in the api and puts it in the slot
                $(`#${selector}name`).html(cap(data.name));//finds name and puts it in the slot 
                checker.type(data,selector) //calls the type function to see what type the pokemon has and apply it
                checker.stats(data, selector)//calls the stats function to see what stats the pokemon has and applies it
            },
            error: () => this.searchBar.addClass('text-danger'), //if there is an error with the pullk request then it changes the text in the searchbar red 
        })
            
    }
}

class Checker {
    type(url, slide) {
        for (let i = 0; i < url.types.length; i++) {
            $(`#${slide}type-${i + 1}`).html(cap(url.types[i].type.name)).removeClass().addClass(url.types[i].type.name) //adds the name removes any existing class then adds the correct class to prevent bug
            if (url.types.length === 1) {   //checks to see if iit has more then one type and it it does adds it    //I have css classes designed for each pokemon type to make it more styilized 
                $(`#${slide}type-2`).html('')
            }
        }    
    }
    stats(url, slide) { //finds corisponding stats and uses the selecter variable to corrispond it to the correct slide
        $(`#${slide}hp`).html(url.stats[0].base_stat)
        $(`#${slide}atk`).html(url.stats[1].base_stat)
        $(`#${slide}def`).html(url.stats[2].base_stat)
        $(`#${slide}sAtk`).html(url.stats[3].base_stat)
        $(`#${slide}sDef`).html(url.stats[4].base_stat)
        $(`#${slide}spd`).html(url.stats[5].base_stat)
    }
    
    slide(x) { //used with the selector variable to see what slide option is selected next to the search bar and will return the the corrsiponding string since all the classes for the slides start with that string
        switch(x) {
            case 1: return 'pk1';
            break;
            case 2: return 'pk2';
            break;
            case 3: return 'pk3';
            break;
            case 4: return 'pk4';            
            break;
            case 5: return 'pk5';
            break;
            case 6: return 'pk6';
        }
    }
    
}

const checker = new Checker;
const search = new Search;
search.addBtn.click(() => search.start()); //starts the search after clicking add

search.searchBar.on('keypress',function(e) { //starts the search after hitting enter
    if(e.code === 'Enter' || e.code === 'NumpadEnter') {
        search.start();
    }
    search.searchBar.removeClass('text-danger')
})
