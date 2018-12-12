var idGallery = document.getElementById("idGallery");
function Container() {
	this.id = "";
	this.className = "";
	this.htmlCode = "";
};

Container.prototype.render = function() {
	return this.htmlCode;
};

function Menu(my_id, my_class, my_items) {
	Container.call(this);
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;
		
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {
	let result = '<div class="' + this.className + '" id="' + this.id + '">';
	for(let item in this.items) {
		if(this.items[item] instanceof MenuItem){
            result += this.items[item].render();
            
		}
	};
	result +='</div>';
	return result;
};

function MenuItem(my_src, my_name, my_id) {
	Container.call(this);
	this.id = my_id;
	this.className = "b-galleryClass__galleryItem";
	this.src = my_src;
	this.name = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
    return '<div class=' + this.className + ' id=' + this.id + '>' + '<img src= ' + this.src +'>' + '</div>';
    
};


function fillMenuContents(xhr) {
	let m_items = {};

	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			let items = JSON.parse(xhr.responseText);

			for (let currentitem of items.menu_items) {
				m_items[currentitem.title] = new MenuItem(currentitem.src, currentitem.title, currentitem.id);
                
            }

			let menu = new Menu("my_gallery", "b-galleryClass", m_items);
			idGallery.innerHTML = menu.render();
		}
	} else {
		alert("Ошибка выполнения запроса!");
	}
};

let xhr;

if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
	if (window.overrideMimeType) {
		xhr.overrideMimeType('application/json');
	}
} else if (window.ActiveXObject) {
	xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

if (!xhr) {
	console.log("Невозможно создать запрос!");
}

xhr.onreadystatechange = setTimeout (function() { fillMenuContents(xhr); }, 300);
xhr.ontimeout = function() { alert("Превышено время ожидания запроса!"); };
xhr.open('GET', 'gallery.json', true);
xhr.send(null);