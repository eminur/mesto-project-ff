(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"c6dff819-6987-4ae1-8399-cc6f04b4a45e","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(e,t,n,o,r,c){var a=e.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),s=a.querySelector(".card__delete-button"),l=a.querySelector(".card__title"),u=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-count");i.src=t.link,i.alt="Изображение местности "+t.name,l.textContent=t.name,d.textContent=t.likes.length,t.owner._id===c?s.addEventListener("click",(function(e){n(e,t._id)})):s.remove();for(var p=0;p<t.likes.length;p++)if(t.likes[p]._id===c){u.classList.add("card__like-button_is-active");break}return u.addEventListener("click",(function(e){o(e,t._id,d)})),i.addEventListener("click",r),a}var o=function(n,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(o).then((function(e){n.target.closest(".places__item").remove()})).catch((function(e){console.log(e)}))},r=function(n,o,r){n.target.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(o).then((function(e){n.target.classList.remove("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(o).then((function(e){n.target.classList.add("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.log(e)}))};function c(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function s(e){e.target===e.currentTarget&&i(e.target)}function l(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),t.setCustomValidity(""),r.classList.remove(o),r.textContent=""}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function d(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t.inputErrorClass,t.errorClass)})),u(n,o,t.inactiveButtonClass)}var p={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},f="Сохранение...",m="Сохранить",v=document.querySelector("#card-template").content,_=document.querySelector(".content"),h=_.querySelector(".places__list"),y=_.querySelector(".profile__edit-button"),b=_.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_new-card"),k=S.querySelector(".popup__close"),C=document.querySelector(".popup_type_edit"),g=C.querySelector(".popup__close"),L=document.querySelector(".popup_type_image"),q=L.querySelector(".popup__close"),E=document.querySelector(".popup_type_avatar"),x=E.querySelector(".popup__close"),A=document.forms["edit-profile"],U=document.forms["edit-avatar"],T=document.forms["new-place"],B=_.querySelector(".profile__title"),w=_.querySelector(".profile__description"),D=_.querySelector(".profile__image"),P=_.querySelector(".profile__avatar-edit-icon"),N="";y.addEventListener("click",(function(){A.elements.name.value=B.textContent,A.elements.description.value=w.textContent,d(A,p),a(C)})),b.addEventListener("click",(function(){T.reset(),a(S)})),P.addEventListener("click",(function(){U.elements["avatar-link"].value="",d(U,p),a(E)})),g.addEventListener("click",(function(){i(C)})),k.addEventListener("click",(function(){i(S)})),q.addEventListener("click",(function(){i(L)})),x.addEventListener("click",(function(){i(E)})),C.addEventListener("click",s),S.addEventListener("click",s),L.addEventListener("click",s),E.addEventListener("click",s),A.addEventListener("submit",(function(n){var o,r;n.preventDefault(),A.elements["button-save"].textContent=f,(o=A.elements.name.value,r=A.elements.description.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t)).then((function(e){B.textContent=e.name,w.textContent=e.about,i(C)})).catch((function(e){console.log(e)})).finally((function(){A.elements["button-save"].textContent=m}))})),T.addEventListener("submit",(function(c){var a,s;c.preventDefault(),T.elements["button-save"].textContent=f,(a=T.elements["place-name"].value,s=T.elements.link.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:s})}).then(t)).then((function(e){h.prepend(n(v,e,o,r,O,N)),T.reset(),d(T,p),i(S)})).catch((function(e){console.log(e)})).finally((function(){T.elements["button-save"].textContent=m}))})),U.addEventListener("submit",(function(n){var o;n.preventDefault(),U.elements["button-save"].textContent=f,(o=U.elements["avatar-link"].value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(e){D.setAttribute("style","background-image: url(".concat(U.elements["avatar-link"].value,")")),i(E)})).catch((function(e){console.log(e)})).finally((function(){U.elements["button-save"].textContent=m}))}));var O=function(e){var t=L.querySelector(".popup__image"),n=L.querySelector(".popup__caption"),o=e.target.closest(".places__item");t.src=e.target.src,t.alt=e.target.alt,n.textContent=o.querySelector(".card__title").textContent,a(L)};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()}));var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);u(n,o,e.inactiveButtonClass),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(t,r,e.inputErrorClass,e.errorClass),u(n,o,e.inactiveButtonClass)}))}))}))}(p),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){N=e[0]._id,B.textContent=e[0].name,w.textContent=e[0].about,D.setAttribute("style","background-image: url(".concat(e[0].avatar,")"));for(var t=0;t<e[1].length;t++)h.append(n(v,e[1][t],o,r,O,N))})).catch((function(e){console.log(e)}))})();