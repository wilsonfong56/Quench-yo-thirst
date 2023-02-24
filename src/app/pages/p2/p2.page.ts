import { Component, OnInit, Input } from '@angular/core';
import { TestService } from 'src/environments/services/test.service';

@Component({
  selector: 'app-p2',
  templateUrl: './p2.page.html',
  styleUrls: ['./p2.page.scss'],
})
export class P2Page implements OnInit {

  //@Input() height!: string;

  constructor(public _testService: TestService) { }

  ngOnInit() {
    console.log(this._testService.myData)
  }

}
