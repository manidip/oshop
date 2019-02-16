import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css']
})
export class NotAllowedComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    setTimeout(function($this){
      $this.router.navigate(['/']);
    },2000,this)

  }

}
