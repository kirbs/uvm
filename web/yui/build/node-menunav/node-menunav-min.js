/* YUI 3.9.0 (build 5827) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
YUI.add("node-menunav",function(e,t){var n=e.UA,r=e.later,i=e.ClassNameManager.getClassName,s="menu",o="menuitem",u="hidden",a="parentNode",f="children",l="offsetHeight",c="offsetWidth",h="px",p="id",d=".",v="handledMouseOut",m="handledMouseOver",g="active",y="label",b="a",w="mousedown",E="keydown",S="click",x="",T="first-of-type",N="role",C="presentation",k="descendants",L="UI",A="activeDescendant",O="useARIA",M="aria-hidden",_="content",D="host",P=A+"Change",H="autoSubmenuDisplay",B="mouseOutHideDelay",j=i(s),F=i(s,u),I=i(s,"horizontal"),q=i(s,y),R=i(s,y,g),U=i(s,y,s+"visible"),z=i(o),W=i(o,g),X=d+j,V=d+i(s,"toggle"),$=d+i(s,_),J=d+q,K=">"+$+">ul>li>a",Q=">"+$+">ul>li>"+J+">a:first-child",G=function(e){var t=e.previous(),n;return t||(n=e.get(a).get(f),t=n.item(n.size()-1)),t},Y=function(e){var t=e.next();return t||(t=e.get(a).get(f).item(0)),t},Z=function(e){var t=!1;return e&&(t=e.get("nodeName").toLowerCase()===b),t},et=function(e){return e.hasClass(z)},tt=function(e){return e.hasClass(q)},nt=function(e){return e.hasClass(I)},rt=function(e){return e.hasClass(U)},it=function(e){return Z(e)?e:e.one(b)},st=function(e,t,n){var r;return e&&(e.hasClass(t)&&(r=e),!r&&n&&(r=e.ancestor(d+t))),r},ot=function(e){return e.ancestor(X)},ut=function(e,t){return st(e,j,t)},at=function(e,t){var n;return e&&(n=st(e,z,t)),n},ft=function(e,t){var n;return e&&(t?n=st(e,q,t):n=st(e,q)||e.one(d+q)),n},lt=function(e,t){var n;return e&&(n=at(e,t)||ft(e,t)),n},ct=function(e){return lt(e.one("li"))},ht=function(e){return et(e)?W:R},pt=function(e,t){return e&&!e[m]&&(e.compareTo(t)||e.contains(t))},dt=function(e,t){return e&&!e[v]&&!e.compareTo(t)&&!e.contains(t)},vt=function(){vt.superclass.constructor.apply(this,arguments)};vt.NAME="nodeMenuNav",vt.NS="menuNav",vt.SHIM_TEMPLATE_TITLE="Menu Stacking Shim",vt.SHIM_TEMPLATE='<iframe frameborder="0" tabindex="-1" class="'+i("shim")+'" title="'+vt.SHIM_TEMPLATE_TITLE+'" src="javascript:false;"></iframe>',vt.ATTRS={useARIA:{value:!0,writeOnce:!0,lazyAdd:!1,setter:function(t){var n=this.get(D),r,u,a,f;t&&(n.set(N,s),n.all("ul,li,"+$).set(N,C),n.all(d+i(o,_)).set(N,o),n.all(d+q).each(function(t){r=t,u=t.one(V),u&&(u.set(N,C),r=u.previous()),r.set(N,o),r.set("aria-haspopup",!0),a=t.next(),a&&(a.set(N,s),r=a.previous(),u=r.one(V),u&&(r=u),f=e.stamp(r),r.get(p)||r.set(p,f),a.set("aria-labelledby",f),a.set(M,!0))}))}},autoSubmenuDisplay:{value:!0,writeOnce:!0},submenuShowDelay:{value:250,writeOnce:!0},submenuHideDelay:{value:250,writeOnce:!0},mouseOutHideDelay:{value:750,writeOnce:!0}},e.extend(vt,e.Plugin.Base,{_rootMenu:null,_activeItem:null,_activeMenu:null,_hasFocus:!1,_blockMouseEvent:!1,_currentMouseX:0,_movingToSubmenu:!1,_showSubmenuTimer:null,_hideSubmenuTimer:null,_hideAllSubmenusTimer:null,_firstItem:null,initializer:function(t){var n=this,r=this.get(D),i=[],s;r&&(n._rootMenu=r,r.all("ul:first-child").addClass(T),r.all(X).addClass(F),i.push(r.on("mouseover",n._onMouseOver,n)),i.push(r.on("mouseout",n._onMouseOut,n)),i.push(r.on("mousemove",n._onMouseMove,n)),i.push(r.on(w,n._toggleSubmenuDisplay,n)),i.push(e.on("key",n._toggleSubmenuDisplay,r,"down:13",n)),i.push(r.on(S,n._toggleSubmenuDisplay,n)),i.push(r.on("keypress",n._onKeyPress,n)),i.push(r.on(E,n._onKeyDown,n)),s=r.get("ownerDocument"),i.push(s.on(w,n._onDocMouseDown,n)),i.push(s.on("focus",n._onDocFocus,n)),this._eventHandlers=i,n._initFocusManager())},destructor:function(){var t=this._eventHandlers;t&&(e.Array.each(t,function(e){e.detach()}),this._eventHandlers=null),this.get(D).unplug("focusManager")},_isRoot:function(e){return this._rootMenu.compareTo(e)},_getTopmostSubmenu:function(e){var t=this,n=ot(e),r;return n?t._isRoot(n)?r=e:r=t._getTopmostSubmenu(n):r=e,r},_clearActiveItem:function(){var e=this,t=e._activeItem;t&&t.removeClass(ht(t)),e._activeItem=null},_setActiveItem:function(e){var t=this;e&&(t._clearActiveItem(),e.addClass(ht(e)),t._activeItem=e)},_focusItem:function(e){var t=this,n,r;e&&t._hasFocus&&(n=ot(e),r=it(e),n&&!n.compareTo(t._activeMenu)&&(t._activeMenu=n,t._initFocusManager()),t._focusManager.focus(r))},_showMenu:function(t){var r=ot(t),i=t.get(a),s=i.getXY();this.get(O)&&t.set(M,!1),nt(r)?s[1]=s[1]+i.get(l):s[0]=s[0]+i.get(c),t.setXY(s),n.ie<8&&(n.ie===6&&!t.hasIFrameShim&&(t.appendChild(e.Node.create(vt.SHIM_TEMPLATE)),t.hasIFrameShim=!0),t.setStyles({height:x,width:x}),t.setStyles({height:t.get(l)+h,width:t.get(c)+h})),t.previous().addClass(U),t.removeClass(F)},_hideMenu:function(e,t){var n=this,r=e.previous(),i;r.removeClass(U),t&&(n._focusItem(r),n._setActiveItem(r)),i=e.one(d+W),i&&i.removeClass(W),e.setStyles({left:x,top:x}),e.addClass(F),n.get(O)&&e.set(M,!0)},_hideAllSubmenus:function(t){var n=this;t.all(X).each(e.bind(function(e){n._hideMenu(e)},n))},_cancelShowSubmenuTimer:function(){var e=this,t=e._showSubmenuTimer;t&&(t.cancel(),e._showSubmenuTimer=null)},_cancelHideSubmenuTimer:function(){var e=this,t=e._hideSubmenuTimer;t&&(t.cancel(),e._hideSubmenuTimer=null)},_initFocusManager:function(){var t=this,n=t._rootMenu,r=t._activeMenu||n,i=t._isRoot(r)?x:"#"+r.get("id"),s=t._focusManager,o,u,a;nt(r)?(u=i+K+","+i+Q,o={next:"down:39",previous:"down:37"}):(u=i+K,o={next:"down:40",previous:"down:38"}),s?(s.set(A,-1),s.set(k,u),s.set("keys",o)):(n.plug(e.Plugin.NodeFocusManager,{descendants:u,keys:o,circular:!0}),s=n.focusManager,a="#"+n.get("id")+X+" a,"+V,n.all(a).set("tabIndex",-1),s.on(P,this._onActiveDescendantChange,s,this),s.after(P,this._afterActiveDescendantChange,s,this),t._focusManager=s)},_onActiveDescendantChange:function(e,t){e.src===L&&t._activeMenu&&!t._movingToSubmenu&&t._hideAllSubmenus(t._activeMenu)},_afterActiveDescendantChange:function(e,t){var n;e.src===L&&(n=lt(this.get(k).item(e.newVal),!0),t._setActiveItem(n))},_onDocFocus:function(e){var t=this,n=t._activeItem,r=e.target,i;t._rootMenu.contains(r)?t._hasFocus?(i=ot(r),t._activeMenu.compareTo(i)||(t._activeMenu=i,t._initFocusManager(),t._focusManager.set(A,r),t._setActiveItem(lt(r,!0)))):(t._hasFocus=!0
,n=lt(r,!0),n&&t._setActiveItem(n)):(t._clearActiveItem(),t._cancelShowSubmenuTimer(),t._hideAllSubmenus(t._rootMenu),t._activeMenu=t._rootMenu,t._initFocusManager(),t._focusManager.set(A,0),t._hasFocus=!1)},_onMenuMouseOver:function(e,t){var n=this,r=n._hideAllSubmenusTimer;r&&(r.cancel(),n._hideAllSubmenusTimer=null),n._cancelHideSubmenuTimer(),e&&!e.compareTo(n._activeMenu)&&(n._activeMenu=e,n._hasFocus&&n._initFocusManager()),n._movingToSubmenu&&nt(e)&&(n._movingToSubmenu=!1)},_hideAndFocusLabel:function(){var e=this,t=e._activeMenu,n;e._hideAllSubmenus(e._rootMenu),t&&(n=e._getTopmostSubmenu(t),e._focusItem(n.previous()))},_onMenuMouseOut:function(e,t){var n=this,i=n._activeMenu,s=t.relatedTarget,o=n._activeItem,u,a;i&&!i.contains(s)&&(u=ot(i),u&&!u.contains(s)?n.get(B)>0&&(n._cancelShowSubmenuTimer(),n._hideAllSubmenusTimer=r(n.get(B),n,n._hideAndFocusLabel)):o&&(a=ot(o),n._isRoot(a)||n._focusItem(a.previous())))},_onMenuLabelMouseOver:function(e,t){var n=this,i=n._activeMenu,s=n._isRoot(i),o=n.get(H)&&s||!s,u=n.get("submenuShowDelay"),a,f=function(t){n._cancelHideSubmenuTimer(),n._cancelShowSubmenuTimer(),rt(e)||(a=e.next(),a&&(n._hideAllSubmenus(i),n._showSubmenuTimer=r(t,n,n._showMenu,a)))};n._focusItem(e),n._setActiveItem(e),o&&(n._movingToSubmenu?n._hoverTimer=r(u,n,function(){f(0)}):f(u))},_onMenuLabelMouseOut:function(e,t){var n=this,i=n._isRoot(n._activeMenu),s=n.get(H)&&i||!i,o=t.relatedTarget,u=e.next(),a=n._hoverTimer;a&&a.cancel(),n._clearActiveItem(),s&&(n._movingToSubmenu&&!n._showSubmenuTimer&&u?n._hideSubmenuTimer=r(n.get("submenuHideDelay"),n,n._hideMenu,u):!n._movingToSubmenu&&u&&(!o||o&&!u.contains(o)&&!o.compareTo(u))&&(n._cancelShowSubmenuTimer(),n._hideMenu(u)))},_onMenuItemMouseOver:function(e,t){var n=this,r=n._activeMenu,i=n._isRoot(r),s=n.get(H)&&i||!i;n._focusItem(e),n._setActiveItem(e),s&&!n._movingToSubmenu&&n._hideAllSubmenus(r)},_onMenuItemMouseOut:function(e,t){this._clearActiveItem()},_onVerticalMenuKeyDown:function(e){var t=this,n=t._activeMenu,r=t._rootMenu,i=e.target,s=!1,o=e.keyCode,u,f,l,c;switch(o){case 37:f=ot(n),f&&nt(f)?(t._hideMenu(n),l=G(n.get(a)),c=lt(l),c&&(tt(c)?(u=c.next(),u?(t._showMenu(u),t._focusItem(ct(u)),t._setActiveItem(ct(u))):(t._focusItem(c),t._setActiveItem(c))):(t._focusItem(c),t._setActiveItem(c)))):t._isRoot(n)||t._hideMenu(n,!0),s=!0;break;case 39:tt(i)?(u=i.next(),u&&(t._showMenu(u),t._focusItem(ct(u)),t._setActiveItem(ct(u)))):nt(r)&&(u=t._getTopmostSubmenu(n),l=Y(u.get(a)),c=lt(l),t._hideAllSubmenus(r),c&&(tt(c)?(u=c.next(),u?(t._showMenu(u),t._focusItem(ct(u)),t._setActiveItem(ct(u))):(t._focusItem(c),t._setActiveItem(c))):(t._focusItem(c),t._setActiveItem(c)))),s=!0}s&&e.preventDefault()},_onHorizontalMenuKeyDown:function(e){var t=this,n=t._activeMenu,r=e.target,i=lt(r,!0),s=!1,o=e.keyCode,u;o===40&&(t._hideAllSubmenus(n),tt(i)&&(u=i.next(),u&&(t._showMenu(u),t._focusItem(ct(u)),t._setActiveItem(ct(u))),s=!0)),s&&e.preventDefault()},_onMouseMove:function(e){var t=this;r(10,t,function(){t._currentMouseX=e.pageX})},_onMouseOver:function(e){var t=this,n,r,i,s,o;t._blockMouseEvent?t._blockMouseEvent=!1:(n=e.target,r=ut(n,!0),i=ft(n,!0),o=at(n,!0),pt(r,n)&&(t._onMenuMouseOver(r,e),r[m]=!0,r[v]=!1,s=ot(r),s&&(s[v]=!0,s[m]=!1)),pt(i,n)&&(t._onMenuLabelMouseOver(i,e),i[m]=!0,i[v]=!1),pt(o,n)&&(t._onMenuItemMouseOver(o,e),o[m]=!0,o[v]=!1))},_onMouseOut:function(e){var t=this,n=t._activeMenu,r=!1,i,s,o,u,a,f;t._movingToSubmenu=n&&!nt(n)&&e.pageX-5>t._currentMouseX,i=e.target,s=e.relatedTarget,o=ut(i,!0),u=ft(i,!0),f=at(i,!0),dt(u,s)&&(t._onMenuLabelMouseOut(u,e),u[v]=!0,u[m]=!1),dt(f,s)&&(t._onMenuItemMouseOut(f,e),f[v]=!0,f[m]=!1),u&&(a=u.next(),a&&s&&(s.compareTo(a)||a.contains(s))&&(r=!0));if(dt(o,s)||r)t._onMenuMouseOut(o,e),o[v]=!0,o[m]=!1},_toggleSubmenuDisplay:function(e){var t=this,r=e.target,i=ft(r,!0),s=e.type,o,u,a,f,l,c;if(i){o=Z(r)?r:r.ancestor(Z);if(o){a=o.getAttribute("href",2),f=a.indexOf("#"),l=a.length;if(f===0&&l>1){c=a.substr(1,l),u=i.next();if(u&&u.get(p)===c){if(s===w||s===E)(n.opera||n.gecko||n.ie)&&s===E&&!t._preventClickHandle&&(t._preventClickHandle=t._rootMenu.on("click",function(e){e.preventDefault(),t._preventClickHandle.detach(),t._preventClickHandle=null})),s==w&&(e.preventDefault(),e.stopImmediatePropagation(),t._hasFocus=!0),t._isRoot(ot(r))?rt(i)?(t._hideMenu(u),t._focusItem(i),t._setActiveItem(i)):(t._hideAllSubmenus(t._rootMenu),t._showMenu(u),t._focusItem(ct(u)),t._setActiveItem(ct(u))):t._activeItem==i?(t._showMenu(u),t._focusItem(ct(u)),t._setActiveItem(ct(u))):i._clickHandle||(i._clickHandle=i.on("click",function(){t._hideAllSubmenus(t._rootMenu),t._hasFocus=!1,t._clearActiveItem(),i._clickHandle.detach(),i._clickHandle=null}));s===S&&e.preventDefault()}}}}},_onKeyPress:function(e){switch(e.keyCode){case 37:case 38:case 39:case 40:e.preventDefault()}},_onKeyDown:function(e){var t=this,i=t._activeItem,s=e.target,o=ot(s),u;o&&(t._activeMenu=o,nt(o)?t._onHorizontalMenuKeyDown(e):t._onVerticalMenuKeyDown(e),e.keyCode===27&&(t._isRoot(o)?i&&(tt(i)&&rt(i)?(u=i.next(),u&&t._hideMenu(u)):(t._focusManager.blur(),t._clearActiveItem(),t._hasFocus=!1)):(n.opera?r(0,t,function(){t._hideMenu(o,!0)}):t._hideMenu(o,!0),e.stopPropagation(),t._blockMouseEvent=n.gecko?!0:!1)))},_onDocMouseDown:function(e){var t=this,r=t._rootMenu,i=e.target;!r.compareTo(i)&&!r.contains(i)&&(t._hideAllSubmenus(r),n.webkit&&(t._hasFocus=!1,t._clearActiveItem()))}}),e.namespace("Plugin"),e.Plugin.NodeMenuNav=vt},"3.9.0",{requires:["node","classnamemanager","plugin","node-focusmanager"],skinnable:!0});
