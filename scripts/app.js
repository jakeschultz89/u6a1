let important=true;
let form=false;
let serverURL="http://fsdiapi.azurewebsites.net/"
function toggleImport(){
    console.log("clicked");
    if(important===true){
        $("#iImportant").removeClass("fas").addClass("far");
        important=false;
    }else{
        $("#iImportant").removeClass("far").addClass("fas");
        important=true;
    }
}
function toggleForm(){
    if(form){
        $("form").slideUp(500);
        $("#btnAdd").text("Add task");
        form=false;
    }else{
        $("form").slideDown(500);
        $("#btnAdd").text("Hide form");
        form=true;
    }
}
function save(){
    console.log("Saving task");
    // get the values from the inputs
    let title=$("#txtTitle").val();
    let date=$("#selDate").val();
    let location=$("#txtLocation").val();
    let priority=$("#selPriority").val();
    let color=$("#selColor").val();
    let collaborator=$("#txtCollaborator").val();
    let description=$("#txtDescription").val();
    // // console log them
    // console.log(title,date,location,priority,color,collaborator,description);
    //create a new Task object
    let task = new Task(title,important,date,location,priority,color,collaborator,description);

    $.ajax({
        type:"POST",
        url:serverURL+"api/tasks",
        data:JSON.stringify(task),
        contentType:"application/json",
        success:function(res){
            console.log("Server says", res);
            alert("The task was registered successfully!");
            let t=JSON.parse(res);
        },
        error:function(error){
            console.log("Error saving task", error);
        }
    });

    // console.log(task);
    clearForm();
    displayTask(task);
}
function displayTask(task){
    //display obj information
    syntax=`
    <div>
        <h6>${task.title}</h6>
        <label>${task.location}</label>
        <label>${task.collaborator}</label>
        <label>${task.description}</label>
        <label>${task.priority}</label>
        <label>${task.date}</label>
    </div>`;
    $(".pending-tasks").append(syntax);
}
function getTask(){
    $.ajax({
        type:"GET",
        url:serverURL+"api/tasks",
        success:function(res){
            let t=JSON.parse(res);
            for(let i = 0;i<t.length;i++){
                if(t[i].name==="Jake"){
                    console.log(t[i]);
                    displayTask(t[i]);
                }
            }
            console.log("Server says: "+t);
        },
        error:function(err){
            console.log("Error getting tasks: ", err);
        }
    })
}
function clearForm(){
    // homework
    txtTitle.value="";
    selDate.value="";
    txtLocation.value="";
    selPriority.value="";
    selColor.value="#000000";
    txtCollaborator.value="";
    txtDescription.value="";
}
function init(){
    console.log("Calendar System");
    $("form").hide();
    getTask();
    //hook event
    $("#btnAdd").click(toggleForm);
    $("#iImportant").click(toggleImport);
    $("#btnSave").click(save);
}

window.onload=init;