import {
  observable,
  configure,
  action,
  autorun,
  runInAction,
  makeObservable,
} from 'mobx';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import {Alert} from 'react-native';

configure({
  enforceActions: 'observed',
});

//let apidirection = "http://localhost:5001";
let apidirection = 'http://casadora.ktakip.site/';
class AuthStore {
  @observable kullaniciadi = 'firstuser';
  @observable sifre = '1234';
  @observable barcoded = [];

  constructor() {
    autorun(() => {});
    makeObservable(this);
  }

  @action UpdatedBarkodList = barkoddata => {
    runInAction(() => {
      this.barcoded = [...this.barcoded, barkoddata];

      // <====== We dont have to define an action
    });
  };

  @action ClearBarkodList = barkoddata => {
    runInAction(() => {
      this.barcoded = [];

      // <====== We dont have to define an action
    });
  };

  @action DeleteItemFromBarkodList = indext => {
    runInAction(() => {
      this.barcoded = this.barcoded.filter((t, index) => index != indext - 1);
      // <====== We dont have to define an action
    });
  };

  @action async SetHareket(ball) {
    //alert(JSON.stringify(ball));

    await axios
      .post('' + apidirection + '/auth/addhareket', ball)
      .then(response => {
        //alert(JSON.stringify(response.data))
      })
      .catch(function (error) {
        alert(error);

        //  alert(error);
      });
  }
  /*
      @action GetTokenAndLogin = () => {
        let person = {
          ad: this.kullaniciadi,
          sifre: this.sifre,
        };
    
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
    
        axios
          .post("" + apidirection + "/auth/login", person, axiosConfig)
          .then((response) => {
            if (String(response.data) == "-1") {
              this.uyari = "Wrong User!";
    
              alert(this.uyari);
            } else {
              var decoded = jwt_decode(response.data.value);
    
              runInAction(() => {
                this.token = response.data.value;
                this.nameid = decoded.nameid;
                this.usercurrentpoint = decoded.acr;
                this.mail = decoded.email;
              });
    
              this.navigation.navigate("anasayfa");
            }
          })
          .catch((error) => {
            alert(error + " xxX");
          });
      };
      @action ResetUserPointInGame = () => {
        runInAction(() => {
          this.basicgamepoint = 0;
    
          // <====== We dont have to define an action
        });
      };
      @action UpdateUserPointInGameWin = () => {
        runInAction(() => {
          this.basicgamepoint = this.basicgamepoint + 4;
          // <====== We dont have to define an action
        });
      };
    
      @action UpdateUserPointInGameLost = () => {
        runInAction(() => {
          this.basicgamepoint = this.basicgamepoint - 1;
          // <====== We dont have to define an action
        });
      };
    
      @action UpdateUPointAmountForDatabase = () => {
        runInAction(() => {
          this.usercurrentpoint = (
            Number(this.usercurrentpoint) + Number(this.basicgamepoint)
          ).toString();
    
          // <====== We dont have to define an action
        });
      };
      @action UpdateUserPoint = () => {
        let person = {
          nameid: this.nameid,
          pointamount: this.basicgamepoint.toString(),
        };
    
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
    
        axios
          .post("" + apidirection + "/auth/updateuserpoint", person, axiosConfig)
          .then((response) => {
            if (String(response.data) == "-1") {
              this.uyari = "Could Not Updated Point!";
    
              alert(this.uyari);
            } else {
              runInAction(() => {
                // <====== We dont have to define an action
              });
            }
          })
          .catch((error) => {
            alert(error + " xxX");
          });
      };
    
      @action UpdateUserName = () => {
        let person = {
          nameid: this.nameid,
          ad: this.kullaniciadi,
        };
    
        alert(JSON.stringify(person));
    
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
    
        axios
          .post("" + apidirection + "/auth/updateusername", person, axiosConfig)
          .then((response) => {
            if (String(response.data) == "-1") {
              this.uyari = "Could Not Updated User Name!";
    
              alert(this.uyari);
            } else {
              runInAction(() => {
                this.usercurrentpoint = Number(this.usercurrentpoint) + 1;
                // <====== We dont have to define an action
              });
            }
          })
          .catch((error) => {
            alert(error + " xxX");
          });
      };
    
      @action UpdateUserPass = () => {
        let person = {
          nameid: this.nameid,
          sifre: this.sifre,
        };
    
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
    
        axios
          .post("" + apidirection + "/auth/updateuserpass", person, axiosConfig)
          .then((response) => {
            if (String(response.data) == "-1") {
              this.uyari = "Could Not Updated Password!";
    
              alert(this.uyari);
            } else {
              runInAction(() => {
                this.usercurrentpoint = Number(this.usercurrentpoint) + 1;
                // <====== We dont have to define an action
              });
            }
          })
          .catch((error) => {
            alert(error + " xxX");
          });
      };
    
      @action.bound fetchUsersSuccess(trees) {
        alert(this.trees);
      }
    
      @action.bound fetchUsersError() {
        alert("error");
      }
    
      */
}

export default new AuthStore();
