RandomPostsGenerator = typeof RandomPostsGenerator == 'undefined' ? 0 : RandomPostsGenerator + 1;

(function(nr) {
	let tablica = [];
	let skrypt = document.querySelectorAll('script[src="https://bloggerwidgets.github.io/scripts/randomposts.js"]')[nr];
	let glowny = document.createElement('div');
	skrypt.parentNode.insertBefore(glowny, skrypt);
	
	let ilePostow = Number(skrypt.getAttribute('numberOfPosts'));
	if (ilePostow < 1 || isNaN(ilePostow)) ilePostow = 5;
	
	let kategoria = skrypt.getAttribute('label');
	if (kategoria === 'none' || kategoria === '' || kategoria === null) {
		kategoria = '';
	} else {
		kategoria = '/-/' + kategoria;
	}
	
	let zaokraglenie = skrypt.getAttribute('rounding') ? Number(skrypt.getAttribute('rounding')) : 6;
	if (zaokraglenie < 0 || isNaN(zaokraglenie)) zaokraglenie = 6;
	
	let wielkoscTekstu = Number(skrypt.getAttribute('textSize'));
	if (wielkoscTekstu < 8 || isNaN(wielkoscTekstu)) wielkoscTekstu = 12;
	let wielkoscTytulu = Number(skrypt.getAttribute('titleSize'));
	if (wielkoscTytulu < 8 || isNaN(wielkoscTytulu)) wielkoscTytulu = wielkoscTekstu + 3;
	let margines = wielkoscTekstu < 12 ? 2 : (wielkoscTekstu < 21 ? 3 : 4);
	
	let borderWidth = skrypt.getAttribute('borderWidth') ? Number(skrypt.getAttribute('borderWidth')) : 1;
	if (borderWidth < 0 || isNaN(borderWidth)) borderWidth = 1;
	
	let borderStyle = skrypt.getAttribute('borderStyle');
	if (borderStyle !== 'dotted' && borderStyle !== 'dashed') borderStyle = 'solid';
	
	let borderColor = skrypt.getAttribute('borderColor') ? skrypt.getAttribute('borderColor') : '#9d0000';
	
	let kolorTytulu = skrypt.getAttribute('titleColor') ? skrypt.getAttribute('titleColor') : '#9d0000';
	let kolorTekstu = skrypt.getAttribute('textColor') ? skrypt.getAttribute('textColor') : '#333333';
	let kolorTla = skrypt.getAttribute('background') ? skrypt.getAttribute('background') : '#ffffff';
	let czcionkaTytul = skrypt.getAttribute('titleFont') ? skrypt.getAttribute('titleFont') : '\'Comic Sans MS\', cursive, sans-serif';
	let czcionkaTekst = skrypt.getAttribute('textFont') ? skrypt.getAttribute('textFont') : 'Georgia, serif';
	let obrazek = skrypt.getAttribute('thumbnail');
	if (obrazek !== 'center' && obrazek !== 'right' && obrazek !== 'none')  obrazek = 'left';
	
	let wielkoscObrazka = skrypt.getAttribute('thumbnailSize');
	if (Number(wielkoscObrazka) < 0 || isNaN(wielkoscObrazka) || wielkoscObrazka === null) {
		wielkoscObrazka = 70;
	}
	let obrazekRadius = skrypt.getAttribute('thumbnailRounding');
	if (isNaN(obrazekRadius) || obrazekRadius === null) {
		obrazekRadius = 15;
	}
	let brakObrazka = skrypt.getAttribute('noThumbnail');
	if (brakObrazka === 'default' || brakObrazka === '' || brakObrazka === null) brakObrazka = 'https://3.bp.blogspot.com/-go-1bJQKzCY/XIpRVUCKeCI/AAAAAAAAAQM/YUdYK3hEkcIFwcz0r-T2uErre0JOJWnrwCLcBGAs/s1600/no-image.png';
	
	function lapAtrybut(f) {
		let zwrot = f;
		if (zwrot !== 'none' || zwrot !== 'right' || zwrot !== 'center') zwrot = 'left';
		return zwrot;
	}
	
	let tytul = lapAtrybut(skrypt.getAttribute('postTitle'));
	let informacje = lapAtrybut(skrypt.getAttribute('postInfo'));
	let etykiety = lapAtrybut(skrypt.getAttribute('postCategories'));
	
	let showAuthor = skrypt.getAttribute('showAuthor') === 'false' || skrypt.getAttribute('showAuthor') === 'none' ? false : true;
	let dataPubl = skrypt.getAttribute('publishDate') === 'false' || skrypt.getAttribute('publishDate') === 'none' ? false : true;
	let iloscKom = skrypt.getAttribute('numOfComments') === 'false' || skrypt.getAttribute('numOfComments') === 'none' ? false : true;
	
	let dlugoscWypisu = skrypt.getAttribute('excerptLength');
	if (dlugoscWypisu === null || isNaN(dlugoscWypisu) || Number(dlugoscWypisu) < 0) {
		dlugoscWypisu = 200;
	}
	
	let wypisAlign = skrypt.getAttribute('excerptAlign');
	if (wypisAlign !== 'left' || wypisAlign !== 'center' || wypisAlign !== 'right') wypisAlign = 'justify';
	
	let obStyl = '';
	let margen;
	if (tytul !== 'none' || (informacje !== 'none' && (showAuthor || dataPubl || iloscKom)) || etykiety !== 'none' || dlugoscWypisu !== 'none') {
		margen = true;
	} else {
		margen = false;
	}
	if (obrazek === 'center') {
		obStyl += 'display:block;margin:0 auto ' + (margen ? '5px' : '0') + ';';
	} else {
		obStyl += 'float:' + obrazek + ';margin:' + (obrazek === 'right' ? '0 0 ' + (margen ? '5px 5px' : '0 0') + ';' : '0 ' + (margen ? '5px 5px' : '0 0') + ' 0;');
	}
	obStyl += 'width:' + wielkoscObrazka + 'px;height:auto;padding:0;border:0;border-radius:' + obrazekRadius + '%;';

	let styl = document.createElement('style');
	styl.innerHTML = '.xRandomPost:after{content:"";display:block;clear:both;} .xRandomPost:hover{transform:scale(1.03, 1.03)} .xRandomPost:active{transform:scale(0.97, 0.97)}';
	document.head.appendChild(styl);

	function los(h, j) {
		while (tablica.length < j && tablica.length < h) {
			let numer = Math.floor((Math.random() * h) + 1);
			if (tablica.indexOf(numer) < 0) {
				tablica.push(numer);
				let blok = document.createElement('a');
				blok.setAttribute('post', 'np27' + numer + '0s1');
				blok.setAttribute('class', 'xRandomPost');
				glowny.appendChild(blok);
			}
		}
	}

	function lapWpisy(h, j) {
		let p = {}
		p.link = h.querySelector('link[rel="alternate"]') ? h.querySelector('link[rel="alternate"]').getAttribute('href') : '/';
		p.wypis = dlugoscWypisu > 0 && h.querySelector('summary') ? h.querySelector('summary').textContent.replace(/<(?:.|\n)*?>/gm, '').substring(0, dlugoscWypisu) + '...' : '';
		p.tytul = h.querySelector('title') ? h.querySelector('title').textContent : 'No title';
		p.data = h.querySelector('published') ? h.querySelector('published').textContent.substring(0, 10) : ''
		let obr = h.getElementsByTagName('media\:thumbnail');
		if (obrazek === 'none') {
			p.obrzk = '';
		} else if (obr.length > 0) {
		    p.obrzk = '<img src="' + obr[0].getAttribute('url') + '" style="' + obStyl + '" alt="No image" onerror="this.src\=\'' + brakObrazka + '\'">';
		} else {
			p.obrzk = '<img src="' + brakObrazka + '" style="' + obStyl + '" alt="No image..." onerror="this.src\=\'https://3.bp.blogspot.com/-go-1bJQKzCY/XIpRVUCKeCI/AAAAAAAAAQM/YUdYK3hEkcIFwcz0r-T2uErre0JOJWnrwCLcBGAs/s1600/no-image.png\'">';
		}
		p.koment = h.getElementsByTagName('thr\:total').length > 0 ? Number(h.getElementsByTagName('thr\:total')[0].textContent) : 0;
		p.autor = h.querySelector('author') && h.querySelector('author').querySelector('name') ? h.querySelector('author').querySelector('name').textContent : 'Anonymous';
        p.tagi = [];
		h.querySelectorAll('category').forEach(tag => {
			p.tagi.push(tag.getAttribute('term'));
		});
		
		let elem = glowny.querySelector('a.xRandomPost[post="np27' + j + '0s1"]');
		elem.style.display = 'block';
		elem.style.border = borderWidth + 'px ' + borderStyle + ' ' + borderColor;
		elem.style.fontSize = wielkoscTekstu + 'px';
		elem.style.color = kolorTekstu;
		elem.style.background = kolorTla;
		elem.style.padding = '5px';
		elem.style.lineHeight = '1.2';
		elem.style.fontFamily = czcionkaTekst;
		elem.style.textDecoration = 'none';
		elem.style.rounding = zaokraglenie + 'px';
		elem.style.marginBottom = '5px';
		elem.href = p.link;
		elem.title = p.tytul;
		
		let html = '';
		
		if (obrazek !== 'none') html += p.obrzk;
		if (tytul !== 'none') html += '<div style="text-align:' + tytul + ';font-size:' + wielkoscTytulu + 'px;font-weight:bold;color:' + kolorTytulu + ';font-family:' + czcionkaTytul + ';margin-bottom:' + margines + 'px;">' + p.tytul + '</div>';
		if (informacje !== 'none' && (showAuthor || dataPubl || iloscKom)) {
			html += '<div style="text-align:' + informacje + 'margin-bottom:' + margines + 'px;">';
			
			if (iloscKom) html += '<span style="display:inline-flex;align-items:center;' + (showAuthor || dataPubl ? 'margin-right:' + wielkoscTekstu + 'px;' : '') + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="height:' + (wielkoscTekstu - 3) + 'px;margin-right:' + (wielkoscTekstu / 3) + 'px;"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>' + p.koment;
		
			if (showAuthor) html += '<span style="display:inline-flex;align-items:center;' + (dataPubl ? 'margin-right:' + wielkoscTekstu + 'px;' : '') + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height:' + (wielkoscTekstu - 3) + 'px;margin-right:' + (wielkoscTekstu / 3) + 'px;"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>' + p.autor;
		
			if (dataPubl) html += '<span style="display:inline-flex;align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height:' + (wielkoscTekstu - 3) + 'px;margin-right:' + (wielkoscTekstu / 3) + 'px;"><path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>' + p.data;
			
			html += '</div>';
		}
		
		if (etykiety !== 'none') {
			html += '<div style="text-align:' + etykiety + ';margin-bottom:' + margines + 'px;">';
			p.tagi.forEach(tag => {
				html += '<span style="display:inline-flex;align-items:center;background:' + kolorTekstu + ';color:' + kolorTla + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height:' + (wielkoscTekstu - 3) + 'px;margin-right:' + (wielkoscTekstu / 3) + 'px;"><path fill="currentColor" d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"></path></svg>' + tag + '</span>';
			});
			html += '</div>';
		}
		
		if (dlugoscWypisu > 0) html += '<div style="text-align:' + wypisAlign + '">' + p.wypis + '</div>';
		
		elem.innerHTML = html;
	}

	function pojed(h) {
		let z = new XMLHttpRequest();
		z.open('GET', '/feeds/posts/summary?start-index=' + h + '&max-results=1');
		z.onload = function() {
			if (z.status === 200) {
				let t = z.responseXML.getElementsByTagName('entry')[0];
				lapWpisy(t, h);
			}
		}
		z.send();
	}

	let pytak = new XMLHttpRequest();
	pytak.open('GET', '/feeds/posts/summary' + kategoria + '?start-index=1&max-results=150');
	pytak.onload = function() {
		if (pytak.status === 200) {
			let ilsc = Number(pytak.responseXML.getElementsByTagName('openSearch\:totalResults')[0].textContent);
			los(ilsc, ilePostow);
			let wps = pytak.responseXML.getElementsByTagName('entry');
			for (var x=0; x<tablica.length; x++) {
				var nmr = tablica[x];
				if (nmr <= 150) {
					lapWpisy(wps[nmr-1], nmr);
				} else {
					pojed(nmr)
				}
			}
		}
	}
	pytak.send();

})(RandomPostsGenerator);
