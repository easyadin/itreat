import { PathLocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Gesture, GestureController, Platform } from '@ionic/angular';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.page.html',
  styleUrls: ['./mood.page.scss'],
})
export class MoodPage implements AfterViewInit {
  constructor(private router: Router, private ngZone: NgZone, private gestureCtrl: GestureController, private platform: Platform) { }

  options: AnimationOptions = {
    path: '../../assets/json/like.json',
  };

  allSlides: any[] = [];

  SlideList: any[] = [
    {
      id: "1",
      img: '../../assets/slides/1.jpg',
      logo: '../../assets/shopLogo.svg',
      shopName: 'Level Shoes',
      address: 'Dubai Mall Ground Floor',
      proximity: '1.32km'
    },
    {
      id: "2",
      img: '../../assets/slides/2.jpg',
      logo: '../../assets/shopLogo.svg',
      shopName: 'Acqua Di Parma',
      address: 'Dubai Mall Ground Floor',
      proximity: '1.32km'
    },
    {
      id: "3",
      img: '../../assets/slides/3.jpg',
      logo: '../../assets/shopLogo.svg',
      shopName: 'Accessorize',
      address: 'Dubai Mall Ground Floor',
      proximity: '1.32km'
    },
    {
      id: "4",
      img: '../../assets/slides/4.jpg',
      logo: '../../assets/shopLogo.svg',
      shopName: 'APM Monaco',
      address: 'Dubai Mall Ground Floor',
      proximity: '1.32km'
    },
  ];

  likedList: any[] = [];
  unlikedList: any[] = [];
  unattendedList: any[] = [];
  seenList: any[] = [];

  currentSlide = this.SlideList[0];
  currentIndex = 0.5;

  @ViewChildren('slides', { read: ElementRef }) slides: QueryList<ElementRef>

  isLike = false;

  ngAfterViewInit() {
    this.allSlides = this.SlideList;

    const slideArray = this.slides.toArray();

    this.onSwipe(slideArray);
  }

  ionViewDidEnter() {
    this.SlideList = this.allSlides;
  }

  onSwipe(slides: Array<ElementRef>) {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      const gesture = this.gestureCtrl.create({
        el: slide.nativeElement,
        gestureName: 'swipe',
        direction: 'x',
        onStart: ev => { },
        onMove: ev => {
          // left-right swipe
          slide.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          slide.nativeElement.style.transition = '.3s ease-out';
          // right
          if (ev.deltaX > 150) {
            slide.nativeElement.style.transform = `translateX(${+this.platform.width() * 2}px) rotate(${ev.deltaX / 10}deg)`;
            this.likedList.push(slide.nativeElement.id);

            this.ngZone.run(() => {
              this.seenList.push((slide.nativeElement.id));
              // console.log(this.seenList)

              // show anim
              this.isLike = true;

              setTimeout(() => {
                this.isLike = false;
              }, 300)
            })

            if (this.seenList.length == this.allSlides.length) {
              this.router.navigateByUrl('tabs/home')
            }
          }
          // left
          else if (ev.deltaX < -150) {
            slide.nativeElement.style.transform = `translateX(-${+this.platform.width() * 2}px) rotate(${ev.deltaX / 10}deg)`;
            this.unlikedList.push(slide.nativeElement.id);

            this.ngZone.run(() => {
              this.seenList.push((slide.nativeElement.id));
              // console.log(this.seenList)
            });

            if (this.seenList.length == this.allSlides.length) {
              this.router.navigateByUrl('tabs/home')
            }
          }
          else {
            // console.log(ev)
            slide.nativeElement.style.transform = '';
          }
        },
      });
      gesture.enable(true);
    }
  }

  onSwipeUp(el) {
    // const gesture = this.gestureCtrl.create({
    //   el: el.target,
    //   gestureName: 'swipeUp',
    //   direction: 'y',
    //   onStart: ev => { },
    //   onMove: ev => {
    //     console.log(ev)
    //     // swipe up
    //     // ionContent.nativeElement.style.transform = `translateY(${ev.deltaY}px)`
    //   },
    //   onEnd: ev => {
    //     console.log(ev)
    //     // ionContent.nativeElement.style.transition = '.3s ease-out';
    //   },
    // });
    // gesture.enable(true);

    console.log(el)

    this.router.navigateByUrl('/profilepage')
  }

  onClick(slide) {
    console.log(slide)
    this.SlideList = this.SlideList.filter(s => s.id !== slide.id)
    this.unattendedList.push(slide.id)
    this.seenList.push(`${slide.id}`);
    console.log(this.seenList)

    if (this.seenList.length == this.allSlides.length) {
      this.router.navigateByUrl('tabs/home')
    }
  }

  // animationCreated(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }


}
