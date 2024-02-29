async function dynamicBtn() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const { data } = await res.json();

  console.log(data);
  //   button rendaring
  const btnDiv = getId("btn-div");
  data.forEach((btn) => {
    const button = document.createElement("button");
    button.classList = "btn ml-4";
    button.innerText = `${btn.category}`;
    btnDiv.appendChild(button);
    // button function
    button.addEventListener("click", () => {
      cardFetch(btn.category_id);
    });
  });
}

// card function
async function cardFetch(id) {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const { data } = await res.json();

  allCard(data);
  console.log(data);
}

function allCard(data) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  // looping card
  data.forEach((card) => {
    let verifiedData = "";
    if (card.authors[0].verified) {
      verifiedData = ` <img src="images/verified.png" alt="" />`;
    }
    // card item
    const newCard = document.createElement("div");
    newCard.classList = "border-[1px] bodrer-gray-200 p-4";
    newCard.innerHTML = `

    <div class="h-[150px]">
    <img class="w-full h-full" src="${card.thumbnail}" alt="" />
    </div>
    <div class="flex gap-4 mt-4 ">
      <div class="w-[50px] h-[50px] rounded-full overflow-hidden">
        <img class="rounded-full w-full h-full" src="${card.authors[0].profile_picture}" alt="" />
      </div>
      <div>
        <h1 class="font-bold">
         ${card.title}
        </h1>
        <div class="flex gap-4">
          <p>${card.authors[0].profile_name}</p>
          <span>
          ${verifiedData}
          </span>
        </div>
        <p>${card.others.views}</p>
      </div>
    </div>
  `;

    cardContainer.appendChild(newCard);
  });
}

// call btn data
dynamicBtn();
