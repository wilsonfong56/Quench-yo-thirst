import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/environments/services/test.service';

@Component({
  selector: 'app-p3',
  templateUrl: './p3.page.html',
  styleUrls: ['./p3.page.scss'],
})
export class P3Page implements OnInit {

  constructor(private _testService: TestService) { }
  ngOnInit() {
    this._testService.myData = "This text is from P3Page";
  }

}
