/**
 * Fonction appelée quand on soumet le formulaire
 */
 function handleSubmit(event){
    // On bloque le comportement par défaut du navigateur lors d'une soumission. C'est à dire rediriger la page vers l'url inscrite dans l'attribut action (ou la recharger s'il est vide).
    event.preventDefault();

    // On commence par effacer les potentielles erreurs
    eraseErrors();

    // On récupère la valeur écrite par l'utilisateur dans l'input
    const userValue = getInputValue();

    // On envoie la valeur dans une fonction qui se charge de tester si c'est une couleur valide
    const isValidColor = testColor(userValue);

    // Si la valeur inscrite est valable, alors on procède à la suite des opérations
    if(isValidColor !== false) {
        // On envoie la valeur à la fonction addItem dont le but est de l'afficher sur la page.
        addItem(userValue);
        // On vide le champ
        eraseInput();
    }
}

/**
 * Fonction permettant de récupérer la valeur inscrite dans le champ du formulaire.
 */
function getInputValue(){
    // On sélectionne notre champ
    const input = document.querySelector('#colors-input');

    // On récupère la valeur inscrite dedans
    let value = input.value;

    // On nettoie notre valeur pour supprimer les espaces en début et en fin de chaîne
    value = value.trim();

    // On renvoie la valeur récupérée
    return value;
}

/**
 * Fonction qui permet de valider si le code entré par l'utilisateur est valide
 */
function testColor(color) {

    // On commence par tester si l'utilisateur a bien entré une valeur en vérifiant la longueur de la chaîne
    if(color.length === 0) {

        // On affiche un message d'erreur
        displayError('Vous devez remplir le champ !');

        // La couleur n'est pas valide, on renvoie false.
        return false;
    } 


    // On vérifie que la chaîne commence par #
    // Une chaîne de caractères peut être parcourue comme un tableau : le premier caractère se trouve à l'index 0.
    if(color[0] !== '#') {
        // On affiche un message d'erreur
        displayError('Un code couleur doit commencer par # !');

        // La couleur n'est pas valide, on renvoie false.
        return false;
    }


    // On vérifie que la chaîne fasse soit 4, soit 7 caractères.
    if(color.length !== 4 && color.length !== 7) {
        // On affiche un message d'erreur
        displayError('Un code couleur doit faire 4 ou 7 caractères de long !');

        // La couleur n'est pas valide, on renvoie false.
        return false;
    }

    // Si aucune des erreurs n'a été levée, on indique que la chaîne est valide en retournant "true"
    return true;

}


/**
 * Fonction permettant d'ajouter un nouvel élément à la liste dans le DOM
 */
function addItem(color) {
    // On sélectionne notre liste
    const list = document.querySelector('#colors-list');
    
    // On crée un  nouvel élément de type li 
    const newColorElement = document.createElement('li');

    // On ajoute le code couleur en contenu de ce nouvel élément
    newColorElement.textContent = color;

    // Et on applique la couleur au texte grâce à la propriété CSS color
    newColorElement.style.color = color;

    // Enfin, on ajoute ce nouvel élément au conteneur
    list.append(newColorElement);

}

/**
 * Fonction qui vide le champ du formulaire
 */
function eraseInput() {
    // On sélectionne notre champ
    const input = document.querySelector('#colors-input');

    // On définit la nouvelle de l'input comme étant une chaîne vide
    input.value = '';

    // On donne le focus au champ après l'avoir vidé
    input.focus();
}

/**
 * Fonction qui sert à effacer les erreurs
 */
function eraseErrors() {
    // On sélectionne le conteneur des erreurs
    const errorsContainer = document.querySelector('#colors-error');

    // Puis on redéfinit son contenu comme étant une chaîne vide
    errorsContainer.innerHTML = '';
}

/**
 * Fonction permettant d'afficher une erreur dans le conteneur
 */
function displayError(error) {
    // On sélectionne le conteneur des erreurs
    const errorsContainer = document.querySelector('#colors-error');

    // On ajoute l'erreur récupérée en paramètre dans le conteneur
    errorsContainer.textContent = error;
}


// On sélectionne le formulaire afin de pouvoir surveiller les nouvelles entrées de l'utilisateur.
const form = document.querySelector('#colors-form');

// On place un écouteur d' évènements sur le formulaire. Il va surveiller les  évènements "submit". Ceux-ci sont déclenchés quand on clique sur le bouton OK ou quand on fait entrée dans le formulaire.
// Quand on détecte un submit, on va alors exécuter notre handler "handleSubmit" (handler = fonction appelée par un écouteur d' évènements).
form.addEventListener('submit', handleSubmit);