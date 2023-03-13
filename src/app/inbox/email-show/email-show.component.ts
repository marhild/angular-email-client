import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService, Email } from '../email.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit{

  email: Email

  constructor(private route: ActivatedRoute, private emailService: EmailService) {}

  ngOnInit() {
    this.route.params.pipe(
      // cancels previous request 
      // if new request issues before previous finished
      switchMap(({id}) => {
        return this.emailService.getEmail(id);
      })
    ).subscribe((email) => {
      this.email = email;
    })
  }
}
