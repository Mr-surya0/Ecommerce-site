import React, { useEffect } from "react";
import './header.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

export default function Header({ cart }) {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  useEffect(() => {
    // JavaScript code for slider
    function init(item) {
      var items = item.querySelectorAll("li"),
        current = 0,
        autoUpdate = true,
        timeTrans = 4000;

      var nav = document.createElement("nav");
      nav.className = "nav_arrows";
      var prevbtn = document.createElement("button");
      prevbtn.className = "prev";
      prevbtn.setAttribute("aria-label", "Prev");
      var nextbtn = document.createElement("button");
      nextbtn.className = "next";
      nextbtn.setAttribute("aria-label", "Next");
      var counter = document.createElement("div");
      counter.className = "counter";
      counter.innerHTML = `<span>1</span><span>${items.length}</span>`;

      if (items.length > 1) {
        nav.appendChild(prevbtn);
        nav.appendChild(counter);
        nav.appendChild(nextbtn);
        item.appendChild(nav);
      }

      items[current].className = "current";
      if (items.length > 1) items[items.length - 1].className = "prev_slide";

      var navigate = function (dir) {
        items[current].className = "";
        if (dir === "right") {
          current = current < items.length - 1 ? current + 1 : 0;
        } else {
          current = current > 0 ? current - 1 : items.length - 1;
        }

        var nextCurrent = current < items.length - 1 ? current + 1 : 0,
          prevCurrent = current > 0 ? current - 1 : items.length - 1;

        items[current].className = "current";
        items[prevCurrent].className = "prev_slide";
        items[nextCurrent].className = "";

        counter.firstChild.textContent = current + 1;
      };

      item.addEventListener("mouseenter", function () {
        autoUpdate = false;
      });

      item.addEventListener("mouseleave", function () {
        autoUpdate = true;
      });

      setInterval(function () {
        if (autoUpdate) navigate("right");
      }, timeTrans);

      prevbtn.addEventListener("click", function () {
        navigate("left");
      });

      nextbtn.addEventListener("click", function () {
        navigate("right");
      });

      document.addEventListener("keydown", function (ev) {
        var keyCode = ev.keyCode || ev.which;
        switch (keyCode) {
          case 37:
            navigate("left");
            break;
          case 39:
            navigate("right");
            break;
        }
      });

      item.addEventListener("touchstart", handleTouchStart, false);
      item.addEventListener("touchmove", handleTouchMove, false);

      var xDown = null;
      var yDown = null;
      function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
      }
      function handleTouchMove(evt) {
        if (!xDown || !yDown) {
          return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            navigate("right");
          } else {
            navigate("left");
          }
        }
        xDown = null;
        yDown = null;
      }
    }

    [].slice.call(document.querySelectorAll(".cd-slider")).forEach(function (item) {
      init(item);
    });
  }, []);

  return (
    <div className="containerMainMenu">
      <header>
        <ul>
          <p>
            <img alt="Placeholder image of a shopping cart logo" className="w-12 h-12" height="45" src="https://storage.googleapis.com/a1aa/image/t9brNOCmxeX3QqUdBe3bp3faJLlrz6X86vxTCVFuVJbLB72nA.jpg" width="55" />
            ShopEase
          </p>
          <div className="menu">
            <p><a href="#">Home</a></p>
            <p><a href="#">Shop</a></p>
            <p><a href="#">Brands</a></p>
            <p><a href="#">Contact</a></p>
          </div>
          <p className="cart" onClick={goToCart}>
            <AddShoppingCartIcon style={{ color: '#00a6ff' }} />
            <span>{cart.length}</span>
          </p>
        </ul>
      </header>

      <div className="cd-slider">
        <ul>
          <li>
            <div className="image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1421809313281-48f03fa45e9f?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000)' }}></div>
            <div className="content">
              <h2>Jackets Collection 2024</h2>
              <a href="#">Shop Now</a>
            </div>
          </li>
          <li>
            <div className="image" style={{ backgroundImage: 'url(https://images.unsplash.com/uploads/1411724908903377d4696/2e9b0cb2?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000)' }}></div>
            <div className="content">
              <h2>Wear Your Confidence</h2>
              <a href="#">Shop Now</a>
            </div>
          </li>
          <li>
            <div className="image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1416838375725-e834a83f62b7?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000)' }}></div>
            <div className="content">
              <h2>Comfort Meets Fashion</h2>
              <a href="#">Shop Now</a>
            </div>
          </li>
          <li>
            <div className="image" style={{ backgroundImage: 'url(https://images.unsplash.com/35/JOd4DPGLThifgf38Lpgj_IMG.jpg?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000)' }}></div>
            <div className="content">
              <h2>Winter Collection 2024</h2>
              <a href="#">Shop Now</a>
            </div>
          </li>
          <li>
            <div className="image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1453974336165-b5c58464f1ed?crop=entropy&fit=crop&fm=jpg&h=675&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1000)' }}></div>
            <div className="content">
              <h2>Summer Collection 2024</h2>
              <a href="#">Shop Now</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
