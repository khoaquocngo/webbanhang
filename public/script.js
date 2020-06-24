$("#exampleModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget); 
    var recipient = button.data("whatever"); 
    var modal = $(this);
    if(recipient != "")
    {
      $("#add").addClass("hidden-btn");
      $("#update").removeClass("hidden-btn");
      $.getJSON("/ProductManagement/update/" + recipient, function (data) {
      modal.find(".modal-title").text("CẬP NHẬT SẢN PHẨM");
      modal.find("#ProductName").val(data.ProductName);
      modal.find("#Price").val(data.Price);
      modal.find("#idproduct").val(recipient);
      modal.find("#Description").val(data.Description);
      modal.find("#update").text("THAY ĐỔI");
      
     
    });
  }
  else
  {
    $("#add").removeClass("hidden-btn");
    $("#update").addClass("hidden-btn");
    modal.find(".modal-title").text("THÊM SẢN PHẨM");
    modal.find("#add").text("LƯU");
    modal.find("#ProductName").val("");
    modal.find("#Price").val("");
    modal.find("#Description").val("");
  }
  });