var _gaq = [['_setAccount', 'UA-1128111-24'], ['_trackPageview']];

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function test(expression) {
  var result = expression ? 'Yes' : 'No';
  document.write('<td class="' + result.toLowerCase() + '">' + result + '</td><td></td>');
}
document.write('<style>td:nth-of-type(2) { outline: #aaf solid 3px; }</style>');

domready(function() {
  if (!/#showold$/.test(location.href))
    document.body.className += ' hide-old-browsers';
  else
    document.getElementById('show-old-browsers').checked = true
  var wrapper = document.getElementById('show-old-browsers-wrapper');
  if (wrapper) {
    wrapper.style.display = '';
    document.getElementById('show-old-browsers').onclick = function() {
      if (this.checked) {
        document.body.className = document.body.className.replace('hide-old-browsers', '');
        location.href = location.href.replace(/#*$/, '#showold')
      }
      else {
        document.body.className += 'hide-old-browsers';
        location.href = location.href.replace(/(#showold)*$/, '#')
      }
    };
  }

  var mouseoverTimeout;

  var infoTooltip = document.createElement('pre');
  infoTooltip.className = 'info-tooltip';
  infoTooltip.style.display = 'none';
  document.body.appendChild(infoTooltip);
  infoTooltip.onmouseout = function() {
    infoTooltip.style.display = 'none';
  };
  infoTooltip.onmouseover = function() {
    mouseoverTimeout = null;
  };

  var rows = document.getElementsByTagName('table')[0].rows;
  for (var i = 1; i < rows.length; i++) {
    if (/separator/.test(rows[i].cells[0].className)) continue;

    var infoEl = document.createElement('span');
    infoEl.className = 'info';
    infoEl.innerHTML = 'c';
    rows[i].cells[0].appendChild(infoEl);

    infoEl.onmouseover = function(e) {
      mouseoverTimeout = null;
      var scriptEl = this.parentNode.parentNode.getElementsByTagName('script')[0];
      infoTooltip.innerHTML = scriptEl.innerHTML.replace(/^\n/, '').replace(/</g, '&lt;');
      infoTooltip.style.left = e.pageX + 10 + 'px';
      infoTooltip.style.top = e.pageY + 'px';
      infoTooltip.style.display = 'block';
    };
    infoEl.onmouseout = function(e) {
      mouseoverTimeout = setTimeout(function() {
        if (mouseoverTimeout) {
          infoTooltip.style.display = 'none';
        }
      }, 500);
    };
  }

  function highlightSelected() {
    var hash = document.location.hash.slice(1);
    var trs = document.getElementsByTagName('tr');
    for (var i = 0, len = trs.length; i < len; i++) {
      if (trs[i].cells[0].id === hash) {
        trs[i].className = 'selected';
      }
      else {
        if (hash) {
          trs[i].className = 'dimmed';
        }
        else {
          trs[i].className = '';
        }
      }
    }
  }

  if (document.location.hash) {
    highlightSelected();
  }
  document.onclick = function(e) {
    if (e.target.className === 'anchor') {
      setTimeout(highlightSelected, 10);
    }
    else {
      document.location.hash = '';
      setTimeout(highlightSelected, 10);
    }
  };
  window.onhashchange = function() {
    setTimeout(highlightSelected, 10);
  };
});