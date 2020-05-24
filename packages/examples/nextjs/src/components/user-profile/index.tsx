import Component from "@wazapp/component";
import { tracked, action } from "@wazapp/tracking";
import { service } from '@wazapp/service';

import AuthService from '@src/services/auth';
import { FormEvent } from "react";
import { when } from "@wazapp/helpers";

class UserProfile extends Component {
  @service(AuthService) auth!: AuthService;

  @tracked name?: string;

  template() {
    return (
      <div>
        <h1>Hello {this.auth.user?.name ?? this.name}</h1>

        {when(this.auth.isLoggedIn, (
          <button onClick={this.logout}>Logout</button>
        ), (
          <form onSubmit={this.login}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onInput={this.onInput} required />
            <button type="submit">Login</button>
          </form>
        ))}
      </div>
    );
  }

  @action
  logout() {
    this.auth.logout();
  }

  @action
  onInput(event: FormEvent<HTMLInputElement>) {
    this.name = (event.target as HTMLInputElement).value;
  }

  @action
  login() {
    this.auth.login(this.name)
    this.name = undefined;
  }
}

export default UserProfile;