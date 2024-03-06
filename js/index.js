async function dynamicBtn() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const { data } = await res.json();

  // console.log(data);
  //   button rendaring
  const btnDiv = getId("btn-div");
  data.forEach((btn) => {
    const button = document.createElement("button");
    button.classList = "btn ml-4";
    button.innerText = `${btn.category}`;
    btnDiv.appendChild(button);
    // button function
    button.addEventListener("click", () => {
      getId("loader").classList.remove("hidden");
      sortedId = btn.category_id;
      cardFetch(btn.category_id);
      const allBtn = document.querySelectorAll(".btn");
      for (let btn of allBtn) {
        btn.classList.remove("bg-red-500");
      }
      button.classList.add("bg-red-500");
    });
  });
}

// sorted function

let sortedId = 1000;
let sortView = false;

function sortBtn() {
  getId("loader").classList.remove("hidden");
  cardFetch(sortedId, sortView);
}

// console.log(sortedId);
// card function

async function cardFetch(id, sortId) {
  sortView = true;
  // console.log(id);
  const res = await fetch(
    id
      ? ` https://openapi.programming-hero.com/api/videos/category/${id}`
      : "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const { data } = await res.json();

  if (sortId) {
    data.sort((a, b) => {
      const firstNumber = a.others.views;
      const secondNumber = b.others.views;
      const firstNumberConvert = parseFloat(firstNumber.replace("K", "") || 0);
      const secondNumberConvert = parseFloat(
        secondNumber.replace("K", "") || 0
      );

      return secondNumberConvert - firstNumberConvert;
    });
  }

  allCard(data);
}

function allCard(data) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  // looping card

  setTimeout(() => {
    if (data.length > 0) {
      data.forEach((card) => {
        let verifiedData = "";
        if (card.authors[0].verified) {
          verifiedData = ` <img src="images/verified.png" alt="" />`;
        }
        // card item
        const newCard = document.createElement("div");
        newCard.classList = "border-[1px] bodrer-gray-200 p-4 rounded-lg";
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
    } else {
      cardContainer.innerHTML = `<h1 class="text-center text-[30px] font-bold">Data Not Found !!</h1>`;
    }

    // loader
    getId("loader").classList.add("hidden");
  }, 2000);
}

// call btn data
dynamicBtn();

cardFetch();
