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
	let result = '<head><link rel="stylesheet" href="./styles/styles.css"></head> <ul class="' + this.className + '" id="' + this.id + '">';

	for(let item in this.items) {
		if(this.items[item] instanceof MenuItem && this.items[item].id != "id2"){
			result += this.items[item].render();
			
		}
		else {
			result +='<ul>';
			result += this.items[item].render();
			result +='</ul>';
		}
	};

	result += '</ul>'
	return result;
};

function MenuItem(my_href, my_name, my_id) {
	Container.call(this);
	this.id = my_id;
	if(my_id !="id2"){this.className = "b-menuClass__menuItem";
		}else this.className = "b-menuClass__submenuItem"
	this.href = my_href;
	this.name = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
	return '<li class=' + this.className + '>' + '<a href=" ' + this.href +'">' + this.name + '</a>' + '</li>';
};

// let m_item1 = new MenuItem("/", "Главная","id1");
// let m_item2 = new MenuItem("/catalogue", "Каталог","id1");
// let m_item3 = new MenuItem("/gallery", "Галерея","id1");
// let m_subItem1 = new MenuItem("/1", "суб1","id2");
// let m_subItem2 = new MenuItem("/2", "суб2","id2");
// let m_items = {0: m_item1, 1: m_subItem1, 2: m_subItem2, 3: m_item2, 4: m_item3};
// let menu = new Menu("my_menu", "menu_class", m_items);
// document.write(menu.render());

function fillMenuContents(xhr) {
	let m_items = {};

	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			let items = JSON.parse(xhr.responseText);

			for (let currentitem of items.menu_items) {
				m_items[currentitem.title] = new MenuItem(currentitem.href, currentitem.title, currentitem.id);
			}

			let menu = new Menu("my_menu", "b-menuClass", m_items);
			document.write(menu.render());
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

xhr.onreadystatechange = setTimeout (function() { fillMenuContents(xhr); }, 200);
xhr.ontimeout = function() { alert("Превышено время ожидания запроса!"); };
xhr.open('GET', 'menu.json', true);
xhr.send(null);