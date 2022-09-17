function initListeners() {
  let classLength = 1;
  $("#addClassInput").click((e) => {
    e.preventDefault();

    classLength += 1;

    $("#classInputList").append(
      `<label for="classes" id="class${classLength}">Class ${classLength} <span>*</span></label> 
      <input type="text" id="classList${classLength}" />`
    );
  });

  $("#removeClassInput").click((e) => {
    e.preventDefault();

    if (classLength == 1) return;

    $(`#class${classLength}`).remove();
    $(`#classList${classLength}`).remove();

    classLength -= 1;
  });

  $("#submit").click((e) => {
    e.preventDefault();

    let allStudents = JSON.parse(localStorage.getItem("Student"));

    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let phn = $("#phoneNumber").val();
    let ema = $("#emailAddress").val();
    let classList = [];

    for (let i = 1; i <= classLength; i++) {
      classList.push($(`#classList${i}`).val());
    }

    if (
      fn != "" &&
      ln != "" &&
      phn != "" &&
      ema != "" &&
      !classList.includes("")
    ) {
      let userObj = {
        fName: fn,
        lName: ln,
        phoneNum: phn,
        email: ema,
        classes: classList,
      };
      allStudents.push(userObj);

      localStorage.setItem("Student", JSON.stringify(allStudents));

      $("#firstName").val("");
      $("#lastName").val("");
      $("#phoneNumber").val("");
      $("#emailAddress").val("");

      for (let i = 1; i <= classLength; i++) {
        $(`#classList${i}`).val("");
      }
    } else {
      alert("Enter in all the required fields.");
    }
  });

  $("#getName").click((e) => {
    e.preventDefault();
    $("#app").html("");
    let allStudents = JSON.parse(localStorage.getItem("Student"));

    if (JSON.parse(localStorage.getItem("Student") == "[]")) {
      alert("No students added yet.");
    }

    $.each(allStudents, function (idx, student) {
      let classDivInfo = "";
      for (let i = 0; i < student.classes.length; i++) {
        classDivInfo += `<p id="classInsert">${student.classes[i]}</p>`;
      }

      $("#app").append(
        `<div class="studentInfo">
        <div class="studentName">
          <p><b>Name:</b></p>
          <p id="nameInsert">${student.fName} ${student.lName}</p>
        </div>
        <div class="studentPhone">
          <p><b>Phone:</b></p>
          <p id="phoneInsert">${student.phoneNum}</p>
        </div>
        <div class="studentEmail">
          <p><b>Email:</b></p>
          <p id="emailInsert">${student.email}</p>
        </div>
        <div class="studentClasses">
          <p><b>Classes:</b></p>
          <div id="classInserts">
            ${classDivInfo}
          </div>
        </div>
      </div>`
      );
    });
  });
}

function initSite() {
  if (localStorage) {
    let people = localStorage.getItem("Student");
    if (people) {
      let persons = JSON.parse(localStorage.getItem("Student"));
    } else {
      localStorage.setItem("Student", "[]");
    }
  }
}

$(document).ready(function () {
  initListeners();
  initSite();
});
