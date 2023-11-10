const currentDayEl = $("#currentDay");
const timeBlockEl = $(".time-block");
const rightNow = dayjs().format("dddd, MMMM DD YYYY");
// our function is wrapped in a jQuery call
$(function () {
  timeBlockEl.on("click", handleSaveEvent);

  function handleSaveEvent(event) {
    event.preventDefault();

    // grabs the value of the child that is a textarea of .time-block
    // this is our entered text in the time block
    const descriptionText = $(this).children("textarea").val();

    // grabs parent id and sets as key for the text we store
    localStorage.setItem($(this).attr("id"), descriptionText);
  }

  // creates a variable that contains the present hour
  const curHour = dayjs().hour();

  // Our for loop starts at 9 and ends at 17 to match the dictated time blocks
  for (var i = 9; i < 18; i++) {
    // grabs the block by the id that matches loop value
    // this is our current time block being selected by the for loop
    const parentId = $("#hour-" + i);
    // grabs the child, like before, but leaves out .val for our second use of this constant
    const textArea = parentId.children("textarea");
    // grabs the saved text in localStorage by key id that matches our loop value
    const data = localStorage.getItem("hour-" + i);
    // populates our corresponding time block with our saved text
    textArea.val(data);
    // sets the time class of our current block to correspond with it's relation to now
    // we use the child variable so that the class we add will replace any old one
    if (curHour > i) {
      textArea.addClass("past");
    } else if (i > curHour) {
      textArea.addClass("future");
    } else {
      textArea.addClass("present");
    }
  }

  // sets our time to current time
  function displayTime() {
    currentDayEl.text(rightNow);
  }

  displayTime();
});
