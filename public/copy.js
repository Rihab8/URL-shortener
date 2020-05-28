$(document).ready(function () {
  $("#copy-btn").click(function () {
    console.log("okey inside");
    var text = $("#short-url").get(0);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand("copy");
  });
  $("#myTable").DataTable();
  // Basic example
});
