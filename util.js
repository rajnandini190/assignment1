    let folderIdCounter = 0;

        function generateUniqueId(){
            folderIdCounter++;
            return folderIdCounter;
        }

        function createFolderButtons(){
            let folderButton = document.createElement("button");
            folderButton.innerText = "📁";
            folderButton.classList.add("sub-icon")
            folderButton.setAttribute("onclick", "addFolder(this)")

            let fileButton = document.createElement("button")
            fileButton.innerHTML ="📄"
            fileButton.classList.add("sub-icon")
            fileButton.setAttribute("onclick", "addFile(this)")

            let deleteButton = document.createElement("button")
            deleteButton.innerHTML =  "❌"
            deleteButton.classList.add("sub-icon")
            deleteButton.setAttribute("onclick", "deleteItem(this)")
            
            return { folderButton, fileButton, deleteButton };
        }

        function createArrowIcon(){
            let arrowIcon = document.createElement("span");
            arrowIcon.classList.add("rotate")
            arrowIcon.setAttribute("onclick", "toggleCollapse(this)")
            arrowIcon.innerHTML = "➡️"
            return arrowIcon;
        }


        function createFileNode(name, type){
            let newObj ={
                type: type,
                name: name,
                id: "Item" + generateUniqueId(),
                children: null,
                level: 1
            }
            return newObj;
        }

        const createFolderNode = (name, type) => {
            let newObj ={
                type: type,
                name: name,
                id: "Item"+ generateUniqueId(),
                children:[],
                level: 1
            }
            return newObj;
        }

        const deleteNode = (id, itemsArray, deleteId) => {
            if(id === "folderStructure"){
                id = "root"
            }

            for (let i = 0 ; i < itemsArray.length ; i++) {
                if (id === itemsArray[i].id) {
                    let childArray = itemsArray[i].children;
                    
                    let index = childArray.findIndex((obj) => obj.id === deleteId);
                    itemsArray[i].children.splice(index , 1);
                    return;                
                }
                if (itemsArray[i].children != null) {
                    deleteNode(id, itemsArray[i].children , deleteId);
                }
            }
        }

        function createFileElement(name , obj){
            let mainDiv = document.createElement("div");
            mainDiv.id = generateUniqueId(); 
            mainDiv.style.paddingLeft = ((obj.level) * 10) + "px";
            mainDiv.innerHTML = name;
            let  {deleteButton} = createFolderButtons();
            mainDiv.appendChild(deleteButton)
            return mainDiv;
        }

        function createFolderElement(name , obj ){
            let mainDiv = document.createElement("div");
            mainDiv.id = obj.id;
            mainDiv.style.paddingLeft = ((obj.level) * 10) + "px";

            let arrowButton = createArrowIcon();
            let  {folderButton , fileButton , deleteButton} = createFolderButtons();
            
            let folderName = document.createElement("span");
            folderName.innerText = name;

            mainDiv.appendChild(arrowButton);
            mainDiv.appendChild(folderName)
            mainDiv.appendChild(folderButton);
            mainDiv.appendChild(fileButton);
            mainDiv.appendChild(deleteButton);
            
            let childrenDiv = document.createElement("div");
            childrenDiv.id = generateUniqueId();
            
            mainDiv.appendChild(childrenDiv)
            return mainDiv;
        }

        const toggleCollapse = (event) =>{
            let lastchild = event.parentNode.lastElementChild;

            if(lastchild.classList.length == 0){
                lastchild.classList.add("collapse");
                event.classList.remove("rotate");
                event.classList.add("normal")
            }
            else{
                lastchild.classList.remove("collapse")
                event.classList.add("rotate");
                event.classList.remove("normal")
            }
        }

        const folderStructure = document.getElementById("folderStructure");
        const createFolderBtn = document.getElementById("createFolder");
        const createFileBtn = document.getElementById("createFile");

        createFolderBtn.addEventListener("click", addFolder);
        createFileBtn.addEventListener("click", addFile);

        createFolderNode("Root", "folder"); // Initialize with a root folder.

        function addFolder() {
            let folderName = document.getElementById("itemName").value;
            let parentObj = createFolderNode(folderName, "folder");
            let mainDiv = document.createElement("div");
            mainDiv.appendChild(createFolderElement(folderName, parentObj));
            folderStructure.appendChild(mainDiv);
        }

        function addFile() {
            let fileName = document.getElementById("itemName").value;
            let parentObj = createFileNode(fileName, "file");
            let mainDiv = document.createElement("div");
            mainDiv.appendChild(createFileElement(fileName, parentObj));
            folderStructure.appendChild(mainDiv);
        }

        function deleteItem(element) {
            let parentElement = element.parentNode;
            let parentId = parentElement.parentNode.id;
            let deleteId = parentElement.id;
            deleteNode(parentId, data, deleteId);
            folderStructure.removeChild(parentElement);
        }


function checkFileName(event){
    if(typeof event === "string"){
        fileName = event
    }else{
        fileName = event.value;
    }
    let regex = /^([a-zA-Z]){1,10}$/;
    let regex1 = /^([a-zA-Z]){0}$/;
    
    if(!fileName.match(regex) && !fileName.match(regex1)){
        let a = document.getElementsByClassName("sub-icon")
        for(let i=0 ; i<a.length; i++){
            a[i].style.display = "none"
        }
        alert("File name should be less than 10 char & it should not contain number!!")
    }
}
