$(document).ready(function() {
    $("#add_task").submit(function(event) {
        event.preventDefault();

        var formData = $(this).serializeArray();
        var data = {};

        $.each(formData, function(index, field) {
            data[field.name] = field.value;
        });

        if (!data.task || !data.status || !data.date) {
            alert("Please fill in all required fields.");
            return;
        }

        $.ajax({
            url: "/api/tasks",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                alert("Task added successfully!");
                $("#add_task")[0].reset();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error adding task:", textStatus, errorThrown);
                alert("Error adding task. Please try again.");
            }
        });
    });
});


$("#update_task").submit(function(event) {
    event.preventDefault();

    var formData = $(this).serializeArray();
    var data = {};

    $.each(formData, function(index, field) {
        data[field.name] = field.value;
    });

    $.ajax({
        url: `/api/tasks/${data.id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            alert("Task updated successfully!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error updating task:", textStatus, errorThrown);
            alert("Error updating task. Please try again.");
        }
    });
});


if(window.location.pathname == "/"){
    $(document).on("click", ".table tbody td a.delete", function(){
        var id = $(this).data("id");

        if(confirm("Do you really want to delete this record?")){
            $.ajax({
                url: `/api/tasks/${id}`,
                method: "DELETE",
                success: function(response){
                    alert("Data Deleted Successfully!");
                    location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("Error deleting task:", textStatus, errorThrown);
                    alert("Error deleting task. Please try again.");
                }
            });
        }
    });
}
