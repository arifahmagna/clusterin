import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import{ CommonModule } from '@angular/common'

@Component({
  selector: 'app-sweeper',
  templateUrl: './sweeper.component.html',
  styleUrls: ['./sweeper.component.scss'],
  imports : [CommonModule]
})
export class SweeperComponent implements OnInit, OnDestroy {
  slides = [
   { image: '/assets/slide 1.jpg' },
  { image: '/assets/slide2resize2.png' },
  { image: '/assets/slide3resize.png' },
];


  currentIndex = 0;
  autoSlideSub: Subscription = new Subscription(); // Inisialisasi Subscription

  ngOnInit() {
    
    this.autoSlideSub = interval(3000).subscribe(() => {
      this.nextSlide();
    });
  }

  ngOnDestroy() {
    
    if (this.autoSlideSub) {
      this.autoSlideSub.unsubscribe();
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  selectSlide(index: number) {
    this.currentIndex = index;
  }
}