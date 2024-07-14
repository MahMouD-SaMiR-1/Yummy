let rowData = document.getElementById("rowData");
let searchBlock = document.getElementById("searchBlock");
let submitBtn;
let searchInput = document.querySelector("#searchInput");
let category = document.querySelector("#categories");
let area = document.querySelector("#area");
let ingredients = document.querySelector("#ingredients");
let contactUs = document.querySelector("#contactUs");




$(document).ready(() => {
	searchByName("").then(() => {
		$(".loading").fadeOut(500);
		$("body").css("overflow", "visible");
	});
});

function openNavbar() {
	$(".sideNav").animate(
		{
			left: 0,
		},
		500
	);

	
	for (let i = 0; i < 5; i++) {
		$(".links li")
			.eq(i)
			.animate(
				{
					top: 0,
				},
				(i + 5) * 100
			);
	}
}

function closeNavbar() {
	let boxWidth = $(".sideNav .nav-tab").outerWidth();
	$(".sideNav").animate(
		{
			left: -boxWidth,
		},
		500
	);



	$(".links li").animate(
		{
			top: 300,
		},
		500
	);
}

closeNavbar();
$(".sideNav i.open-close-icon").click(() => {
	if ($(".sideNav").css("left") == "0px") {
		closeNavbar();
	} else {
		openNavbar();
	}
});

function displayMeals(arr) {
	let cartona = "";

	for (let i = 0; i < arr.length; i++) {
		cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
	}

	rowData.innerHTML = cartona;
}

function search() {
	searchBlock.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

	rowData.innerHTML = "";
}

searchInput.addEventListener("click", function () {
	search(), closeNavbar();
});

async function searchByName(term) {
	closeNavbar();
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
	);
	response = await response.json();

	response.meals ? displayMeals(response.meals) : displayMeals([]);
	$(".innerLoad").fadeOut(300);
}

async function searchByFirstLetter(term) {
	closeNavbar();
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	term == "" ? (term = "a") : "";
	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
	);
	response = await response.json();

	response.meals ? displayMeals(response.meals) : displayMeals([]);
	$(".innerLoad").fadeOut(300);
}

async function getCategories() {
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);
	searchBlock.innerHTML = "";

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/categories.php`
	);
	response = await response.json();

	displayCategories(response.categories);
	$(".innerLoad").fadeOut(300);
}

async function getCategoryMeals(category) {
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
	);
	response = await response.json();

	displayMeals(response.meals.slice(0, 20));
	$(".innerLoad").fadeOut(300);
}



function displayCategories(arr) {
	let cartona = "";

	for (let i = 0; i < arr.length; i++) {
		cartona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${
									arr[i].strCategory
								}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
											arr[i].strCategoryThumb
										}" alt="" srcset="">
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription
													.split(" ")
													.slice(0, 20)
													.join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
	}

	rowData.innerHTML = cartona;
}

category.addEventListener("click", function () {
	getCategories(), closeNavbar();
});

async function getArea() {
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	searchBlock.innerHTML = "";

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/list.php?a=list`
	);
	response = await response.json();
	console.log(response.meals);

	displayArea(response.meals);
	$(".innerLoad").fadeOut(300);
}

async function getAreaMeals(area) {
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
	);
	response = await response.json();

	displayMeals(response.meals.slice(0, 20));
	$(".innerLoad").fadeOut(300);
}

function displayArea(arr) {
	let cartona = "";

	for (let i = 0; i < arr.length; i++) {
		cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `;
	}

	rowData.innerHTML = cartona;
}

area.addEventListener("click", function () { 
	getArea(), closeNavbar();
})

async function getIngredients() {
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	searchBlock.innerHTML = "";

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/list.php?i=list`
	);
	response = await response.json();
	console.log(response.meals);

	displayIngredients(response.meals.slice(0, 20));
	$(".innerLoad").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
	);
	response = await response.json();

	displayMeals(response.meals.slice(0, 20));
	$(".innerLoad").fadeOut(300);
}



function displayIngredients(arr) {
	let cartona = "";

	for (let i = 0; i < arr.length; i++) {
		cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
									arr[i].strIngredient
								}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
													.split(" ")
													.slice(0, 20)
													.join(" ")}</p>
                </div>
        </div>
        `;
	}

	rowData.innerHTML = cartona;
}

ingredients.addEventListener("click", function () {
	getIngredients(), closeNavbar();
});

async function getMealDetails(mealID) {
	closeNavbar();
	rowData.innerHTML = "";
	$(".innerLoad").fadeIn(300);

	searchBlock.innerHTML = "";
	let response = await fetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
	);
	response = await response.json();

	displayMealDetails(response.meals[0]);
	$(".innerLoad").fadeOut(300);
}

function displayMealDetails(meal) {
	searchBlock.innerHTML = "";

	let ingredients = ``;

	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients += `<li class="alert alert-info m-2 p-1">${
				meal[`strMeasure${i}`]
			} ${meal[`strIngredient${i}`]}</li>`;
		}
	}

	let tags = meal.strTags?.split(",");
	
	if (!tags) tags = [];

	let tagsStr = "";
	for (let i = 0; i < tags.length; i++) {
		tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
	}

	let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

	rowData.innerHTML = cartona;
}



function showContacts() {
	rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="inputName" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputEmail" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputPhone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="inputAge" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="inputPassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="reinputPassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
	submitBtn = document.getElementById("submitBtn");

	document.getElementById("inputName").addEventListener("focus", () => {
		inputNameTouched = true;
	});

	document.getElementById("inputEmail").addEventListener("focus", () => {
		inputEmailTouched = true;
	});

	document.getElementById("inputPhone").addEventListener("focus", () => {
		inputPhoneTouched = true;
	});

	document.getElementById("inputAge").addEventListener("focus", () => {
		inputAgeTouched = true;
	});

	document.getElementById("inputPassword").addEventListener("focus", () => {
		inputPasswordTouched = true;
	});

	document.getElementById("reinputPassword").addEventListener("focus", () => {
		reinputPasswordTouched = true;
	});
}

contactUs.addEventListener("click", () => { 
	showContacts(), closeNavbar()
})


let inputNameTouched = false;
let inputEmailTouched = false;
let inputPhoneTouched = false;
let inputAgeTouched = false;
let inputPasswordTouched = false;
let reinputPasswordTouched = false;

function inputsValidation() {
	if (inputNameTouched) {
		if (nameValidation()) {
			document
				.getElementById("nameAlert")
				.classList.replace("d-block", "d-none");
		} else {
			document
				.getElementById("nameAlert")
				.classList.replace("d-none", "d-block");
		}
	}
	if (inputEmailTouched) {
		if (emailValidation()) {
			document
				.getElementById("emailAlert")
				.classList.replace("d-block", "d-none");
		} else {
			document
				.getElementById("emailAlert")
				.classList.replace("d-none", "d-block");
		}
	}

	if (inputPhoneTouched) {
		if (phoneValidation()) {
			document
				.getElementById("phoneAlert")
				.classList.replace("d-block", "d-none");
		} else {
			document
				.getElementById("phoneAlert")
				.classList.replace("d-none", "d-block");
		}
	}

	if (inputAgeTouched) {
		if (ageValidation()) {
			document
				.getElementById("ageAlert")
				.classList.replace("d-block", "d-none");
		} else {
			document
				.getElementById("ageAlert")
				.classList.replace("d-none", "d-block");
		}
	}

	if (inputPasswordTouched) {
		if (passwordValidation()) {
			document
				.getElementById("passwordAlert")
				.classList.replace("d-block", "d-none");
		} else {
			document
				.getElementById("passwordAlert")
				.classList.replace("d-none", "d-block");
		}
	}
	if (reinputPasswordTouched) {
		if (repasswordValidation()) {
			document
				.getElementById("repasswordAlert")
				.classList.replace("d-block", "d-none");
		} else {
			document
				.getElementById("repasswordAlert")
				.classList.replace("d-none", "d-block");
		}
	}

	if (
		nameValidation() &&
		emailValidation() &&
		phoneValidation() &&
		ageValidation() &&
		passwordValidation() &&
		repasswordValidation()
	) {
		submitBtn.removeAttribute("disabled");
	} else {
		submitBtn.setAttribute("disabled", true);
	}
}

function nameValidation() {
	return /^[a-zA-Z ]+$/.test(document.getElementById("inputName").value);
}

function emailValidation() {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		document.getElementById("inputEmail").value
	);
}

function phoneValidation() {
	return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
		document.getElementById("inputPhone").value
	);
}

function ageValidation() {
	return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
		document.getElementById("inputAge").value
	);
}

function passwordValidation() {
	return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
		document.getElementById("inputPassword").value
	);
}

function repasswordValidation() {
	return (
		document.getElementById("reinputPassword").value ==
		document.getElementById("inputPassword").value
	);
}
