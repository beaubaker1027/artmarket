import { Component, Input, OnInit }    from '@angular/core';
import { Observable, of }       from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

//modules
import { ProfileService }       from '../../services/profile/profile.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {

  @Input() user: any;
  @Input() isOwnProfile: boolean;

  artworkRange: Array<any>;
  max: number;
  min: number;

  constructor(
  ) {}

  ngOnInit(){
  }



}
