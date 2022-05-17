[1mdiff --git a/src/modules/about/Style.css b/src/modules/about/Style.css[m
[1mindex 29a79c7..2f3c66b 100644[m
[1m--- a/src/modules/about/Style.css[m
[1m+++ b/src/modules/about/Style.css[m
[36m@@ -3,6 +3,10 @@[m
   height:auto;[m
 }[m
 [m
[32m+[m[32m.content-left{[m
[32m+[m[32m  padding-right: 10px;[m
[32m+[m[32m  padding-top: 10%;[m
[32m+[m[32m}[m
 .about-banner{[m
   padding-top: 5%;[m
   padding-left: 20px;[m
[36m@@ -21,6 +25,7 @@[m
 @media (max-width: 991px){[m
   .image-left{[m
     width: 80%;[m
[32m+[m[32m    margin-top: 15%;[m
   }[m
   .about-banner{[m
     display: flex[m
[1mdiff --git a/src/modules/about/index.js b/src/modules/about/index.js[m
[1mindex 753b12b..6f93ea1 100644[m
[1m--- a/src/modules/about/index.js[m
[1m+++ b/src/modules/about/index.js[m
[36m@@ -22,43 +22,6 @@[m [mexport class About extends Component {[m
     }else{[m
       this.setState({theme: 'helpa'})[m
     }[m
[31m-    this.retrieve()[m
[31m-  }[m
[31m-  retrieve(){[m
[31m-    let params = {[m
[31m-      condition: [[m
[31m-        {[m
[31m-          column: 'payload',[m
[31m-          clause: '=',[m
[31m-          value: 'helpa'[m
[31m-        }, {[m
[31m-          column: 'payload',[m
[31m-          clause: 'or',[m
[31m-          value: 'agent'[m
[31m-        }[m
[31m-      ][m
[31m-    }[m
[31m-    this.setState({isLoading: false})[m
[31m-    API.request(Routes.retrievePayload, params, response => {[m
[31m-      this.setState({isLoading: false})[m
[31m-      if(response.data.length > 0) {[m
[31m-        console.log('======', this.state.theme);[m
[31m-        if(this.state.theme === 'agent'){[m
[31m-          let agentData = response.data.filter(item => {return item.payload === 'agent'});[m
[31m-          console.log('========', agentData);[m
[31m-          if(agentData.length > 0){[m
[31m-            agentData[0].payload_value.about = agentData[0].payload_value.about.replace(/\n/g,"<br />");[m
[31m-            this.setState({data: agentData[0].payload_value.about})[m
[31m-          }[m
[31m-        }else{[m
[31m-          let helpaData = response.data.filter(item => {return item.payload === 'helpa'});[m
[31m-          if(helpaData.length > 0){[m
[31m-            helpaData[0].payload_value.about = helpaData[0].payload_value.about.replace(/\n/g,"<br />")[m
[31m-            this.setState({data: helpaData[0].payload_value.about})[m
[31m-          }[m
[31m-        }[m
[31m-      }[m
[31m-    })[m
   }[m
   renderContent(){[m
     const {theme, isLoading, data} = this.state[m
[36m@@ -83,13 +46,9 @@[m [mexport class About extends Component {[m
             </div>[m
             <div className="column-75 content-left">[m
               <h1 className={theme==='agent' ? 'agent' : 'helpa'}>About Us</h1>[m
[31m-              {[m
[31m-                !isLoading && data !== null ? ([m
[31m-                  <p  dangerouslySetInnerHTML={{ __html: data}}></p> // let p tag read html tag(e.g. <br/>) inside the data and format the text accordingly[m
[31m-                ) : ([m
[31m-                  <Skeleton height={40} />[m
[31m-                )[m
[31m-              }[m
[32m+[m[32m              <p>[m
[32m+[m[32m                KeyHelpa originated from the question of how to improve the profitability of real estate agencies given the high cost of labour and overhead expenses, employment regulations and the competitive nature of the real estate industry.<br/><br/> The founders bring to the table their knowledge of accountancy, law and real estate practice to provide agency principals with the flexibility and versatility to deal with their high-volume activities without the need to undertake expensive employment and recruitment expenses. It allows experienced real estate personnel the flexibility to choose their working times to suit their own individual lifestyles.[m
[32m+[m[32m              </p>[m
             </div>[m
           </section>[m
       </div>[m
