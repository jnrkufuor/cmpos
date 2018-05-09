

var app = angular.module('pos-app');

app.controller ('PosController', ['$scope','$http','ModalService','NavParam','ToastService','$location', '$rootScope', function($scope, $http, ModalService, NavParam, ToastService, $location, $rootScope){

    this.selectedStore = JSON.parse(localStorage.getItem("storeInfo"));
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    this.register = JSON.parse(localStorage.getItem("registerInfo"));

      this.cartItems = []; //array of items added to the. cart
      this.productModifiers =[]; //array to temporary hold modifiers of selected cart item which is displayed in a modal
      this.options =[];
      this.selectedCustomerId;
      this.selectedCustomer = {
        id:0,
        name: null,
        phone:'',
        default_location:'',
        email:null
      };
      this.selectedOrderType = 'walk in';
      this.selectedOrder ={};
      this.openCartItem = '';
      this.hidethis = true;
      this.subtotal = 0.0;
      this.orderBeingEdited ={
        id : '',
      };
    this.savedOrder ={id:"1"};
      this.deleted_ids = [];
      this.orderState = 'addOrder';
      this.amountPaid = null;
      this.selectedCartItem ={};
      this.selectedCartItemModifiers = [];
      this.deliveryCharge = 0.00;
      this.hidethis = true;
       this.paymentMethod ='Cash';
       this.curProductList = [];

       this.newCustomer={
        name: null,
        phone: null,
        location: null,
        email:null
       }


      var thisController = this;


      this.initialize = function(){

        if(NavParam.getState() == 'editOrder'){
            thisController.orderState = NavParam.getState();
            NavParam.setState('');
            thisController.orderBeingEdited = NavParam.get();
            thisController.selectedCustomer.id = NavParam.get().customer_id;
            thisController.selectedCustomer.name = NavParam.get().name;
            thisController.selectedCustomer.phone = NavParam.get().phone;
            thisController.selectedCustomer.default_location = NavParam.get().default_location;
            thisController.selectedOrderType = NavParam.get().type_of_order;
            thisController.deliveryCharge = NavParam.get().delivery_charge;



             var req = {
            method: 'GET',                                                                                                                                
            url: $rootScope.apiUrl + '/get_order_sale_items/'+ NavParam.get().id,
            headers: {
            'appkey' : $rootScope.JAPPKEY
            },
                // data: this.user_root_id
            };
        
        $http(req).then(function(response){
            if ((response.status)=="200"){
                thisController.cartItems = response['data'];
                console.log(thisController.cartItems);

                angular.forEach(thisController.cartItems, function(cart_item){  
                   cart_item.modifier_types = angular.fromJson(cart_item.modifier_types);
                   if(cart_item.modifier_types.length > 0){
                    cart_item.hasModifier = 1;
                   }
                 });  

            }

        });
        }

      };

    $scope.$on('initializeOrder', function(e) {  
         thisController.initialize();    
    });




//Loading products
        var req = {
            method: 'GET',                                                                                                                                
            url: $rootScope.apiUrl + '/get_store_products/'+ thisController.selectedStore.id,
            // url: '../../web/js/dummydata.json',
            headers: {
            'appkey' : $rootScope.JAPPKEY
            },
                // data: this.user_root_id
            };
        
        $http(req).then(function(response){
            if ((response.status)=="200"){
                thisController.products = response['data'];
                thisController.products_output = response['data'];
                thisController.curProductList = response['data'];
                console.log(thisController.products);

            }
            else{
                console.log("no");
            }
        });

//Loading product categories
        var req = {
            method: 'GET',                                                                                                                                
            url: $rootScope.apiUrl + '/get_store_product_categories/'+ thisController.selectedStore.id,
            // url: '../../web/js/dummydata.json',
            headers: {
            'appkey' : $rootScope.JAPPKEY
            },
                // data: this.user_root_id
            };
        
        $http(req).then(function(response){
            if ((response.status)=="200"){
                thisController.product_categories = response['data'];
                // console.log(thisController.product_categories);
            }
            else{
                console.log("no");
            }
        });



//Getting Modifiers

    var req1 = {
                method: 'GET',
                url: $rootScope.apiUrl +'/get_store_modifiers/' + thisController.selectedStore.id,
                // url: '../../web/js/dummydata.json',
                headers: {
                'appkey' : $rootScope.JAPPKEY
                },
                    // data: this.user_root_id
                };

        $http(req1).then(function(response){
            if ((response.status)=="200"){
                thisController.modifiers = response['data'];


            }
            else{
                console.log("no");
            }
        });
//end

//Getting Customers
this.loadCustomers = function(){
    var req1 = {
                method: 'GET',
                url: $rootScope.apiUrl +'/get_customers/' + thisController.selectedStore.id,
                // url: '../../web/js/dummydata.json',
                headers: {
                'appkey' : $rootScope.JAPPKEY
                },
                    // data: this.user_root_id
                };

        $http(req1).then(function(response){
            if ((response.status)=="200"){
                thisController.customers = response['data'];

            }
            else{
                console.log("no");
            }
        });
}

//end
this.loadCustomers();


this.addItem = function(productId) {
        var product = _.findWhere(thisController.products, {id: productId});
        thisController.cartItems.push({
            id:0,
            product_id: product.id,
            name: product.name,
            qty: 1,
            cost: product.price,
            hasModifier: 0,
            modifier_types: []
        });



        var modify = _.where(thisController.modifiers, {product_id: product.id});

        // angular.forEach(modify, function(item) {
        //     var default_option = angular.fromJson(item.modifier_options);
        //     console.log(default_option);

        //     thisController.cartItems[thisController.cartItems.length - 1].modifier_types.push({
        //     modifier_id : item.id,
        //     modifier_name : item.modifier_name,
        //     modifier_option : default_option[0]

        //     });

        // });

        if(modify.length > 0){
            thisController.cartItems[thisController.cartItems.length - 1].hasModifier = 1;
        }

        
    };



this.removeItem = function(index, id) {
        thisController.deleted_ids.push(id);
        thisController.cartItems.splice(index,1);

    };

this.setSelectedOrderType = function(index) {
        if(index == 1){
        thisController.selectedOrderType = 'walk in';
        }
        else if(index == 2){
        thisController.selectedOrderType = 'pick up';
        }
        else{
        thisController.selectedOrderType = 'delivery';
        }
    };

this.complete = function(string){  
    thisController.selectedCustomer.id = 0; 
    thisController.selectedCustomer.default_location = null; 
    thisController.selectedCustomer.phone = null; 
    thisController.selectedCustomer.email = null;
    thisController.newCustomer.name = string;
           thisController.hidethis = false;  
           var output = [];  

           angular.forEach(thisController.customers, function(customer){  
                if(customer.name.toLowerCase().indexOf(string.toLowerCase()) >= 0 && customer.id != 0)  
                {  
                     output.push(customer);  
                }  
           });  
           thisController.filterCustomers = output; 
           // console.log(thisController.filterCustomers); 
      };  


      this.fillTextbox = function(customer){  
           thisController.selectedCustomer = customer;  
            console.log(thisController.selectedCustomer);

           thisController.hidethis = true;  
      }; 

      this.total = function() {
            var total = 0;
        angular.forEach(thisController.cartItems, function(item) {
            total += item.cost * item.qty;
        })
         thisController.subtotal = total;
         total = total + thisController.deliveryCharge;

         return total;

    };

    this.minusQty = function(qty, index){
        console.log(qty);
        console.log(index);
        if(qty <= 0){
            thisController.removeItem(index);
        }
    }



    this.createNewOrder = function(){



            var request = {
                method: 'PUT',
                url: $rootScope.apiUrl + '/make_order' ,
                // url: '../../web/js/dummydata.json',
                headers: {
                'appkey' : JAPPKEY
                },
                    // data: this.user_root_id
                 data: {
                'registerID': thisController.register.id,
                'storeID': thisController.selectedStore.id,
                'userID': thisController.userinfo.id,
                'customerID': thisController.selectedCustomer.id,
                'orderType' : thisController.selectedOrderType,
                'saleItems': JSON.stringify(thisController.cartItems),
                'location': thisController.selectedCustomer.default_location,
                'phone': thisController.selectedCustomer.phone,
                'deliveryCharge': thisController.deliveryCharge,
                'subtotal': thisController.subtotal,
                'total' : thisController.total()
                }

                };
        
        $http(request).then(function(response){
            if ((response.status)=="200"){
                // thisController.orderState = 'editOrder';
                // thisController.orderBeingEdited = response['data'].id;
                thisController.savedOrder = response['data'];
                console.log(thisController.savedOrder);
                ModalService.Open('make-order-receipt');
                ToastService.success('New order saved');
                
            }
            else{
                console.log("no");
            }
        });

        console.log(thisController.cartItems);

    };




    this.updateOrder = function(){

                var request = {
                method: 'PUT',
                url: $rootScope.apiUrl + '/update_order' ,
                // url: '../../web/js/dummydata.json',
                headers: {
                'appkey' : JAPPKEY
                },
                    // data: this.user_root_id
                 data: {

                'orderID': thisController.orderBeingEdited.id,
                'userID': thisController.userinfo.id,
                'storeID': thisController.selectedStore.id,
                'customerID': thisController.selectedCustomer.id,
                'orderType' : thisController.selectedOrderType,
                'saleItems': JSON.stringify(thisController.cartItems),
                'location': thisController.selectedCustomer.default_location,
                'phone': thisController.selectedCustomer.phone,
                'deliveryCharge': thisController.deliveryCharge,
                'subtotal': thisController.subtotal,
                'total' : thisController.total(),
                'deleted_ids': JSON.stringify(thisController.deleted_ids)
                }

                };
        
        $http(request).then(function(response){
            if ((response.status)=="200"){
                ToastService.success('Order updated');
                thisController.reset();


            }
            else{
                console.log("no");
            }
        });

    };

    this.makeOrder = function(){
        if(thisController.orderState == 'editOrder'){
            thisController.updateOrder();
        }
        else{
            // console.log(thisController.selectedCustomer);
            if(thisController.cartItems.length > 0){
           
           if(thisController.selectedCustomer.id != 0 || thisController.selectedOrderType == 'walk in'){
            console.log(thisController.selectedCustomer.name);

                thisController.createNewOrder();
                
             }
             else{
                ToastService.error('Customer not added');
             }
            }
            else{
                ToastService.error('Cart empty. Cannot make order');
            }
        }
    };


    this.closeOrder = function(orderId,amountPaid, print){
        console.log(thisController.amountPaid);
        if(thisController.amountPaid != null){

            
            if (thisController.amountPaid >= thisController.total()) {
            var request = {
                method: 'PUT',
                url: $rootScope.apiUrl + '/close_sale/'+ orderId +'/' + thisController.amountPaid +'/'+ thisController.paymentMethod,
                headers: {
                'appkey' : $rootScope.JAPPKEY
                },
                

            };
                $http(request).then(function(response){
                    
                    if((response.status)=="200"){
                        if(print){
                            thisController.printReceipt();
                        }

                        ModalService.Close('make-order-receipt');
                        thisController.reset();
                         ToastService.success('Successfully checked out order')                  
                     }
                    else{
                        console.log('not successful');
                    }
                    }); 
            }
            else{
                ToastService.error('Amount paid is not enough') ;
            }

        }else{
            ToastService.error('Amount paid not entered') ;
        }
            
        };

    this.closeCheckOut = function(){
        ModalService.Close('make-order-receipt');
        thisController.reset();
    };

    this.openNewCustomer = function(){
        thisController.hidethis = true; 
        ModalService.Open('newCustomer');
    };

    this.filterByCategories = function(categoryId){
        thisController.products_output = _.where(thisController.products, {category_id: categoryId});
        thisController.curProductList = thisController.products_output;
    };

    this.filterByFavorites = function(){
        thisController.products_output = _.where(thisController.products, {is_favorite:1});
        thisController.curProductList = thisController.products_output;
    };

    this.showAllProducts = function(){
        thisController.products_output = thisController.products;
        thisController.curProductList = thisController.products_output;
    };


    this.searchProducts = function(string){  

           var output = [];  
           angular.forEach(thisController.curProductList, function(product){  

                if(string.length == 1){

                var product_name_firstletter_to_uppercase = product.name.charAt(0).toUpperCase();
            
                var product_name_without_firstletter = product.name.slice(1).toLowerCase();

                var product_name = product_name_firstletter_to_uppercase + product_name_without_firstletter;

                var string_firstletter_to_uppercase = string.charAt(0).toUpperCase();
                var string_without_firstletter = string.slice(1).toLowerCase();

                var string_for_search = string_firstletter_to_uppercase + string_without_firstletter;


                // console.log(product);
                // console.log(string_for_search);
                // if(product.name.toLowerCase().indexOf(string.toLowerCase()) >= 0)  
                if(product_name.indexOf(string_for_search) >= 0) 
                {  
                     output.push(product);  
                } 
                }
                else{
                    if(product.name.toLowerCase().indexOf(string.toLowerCase()) >= 0)  {
                        output.push(product);
                    }
                } 
           });  
           thisController.products_output = output;  
      };  

    this.openModifiers = function(product , index){
        thisController.selectedCartItem = product;
        thisController.selectedCartItemIndex = index;
        console.log(thisController.selectedCartItemIndex);
        thisController.selectedCartItemModifiers = _.where(thisController.modifiers, {product_id: product.product_id});
        ModalService.Open('modifier-popup');
        console.log(thisController.selectedCartItemModifiers);
    }


    this.parJsonArray = function (json) {
         var json = angular.fromJson(json);
         // console.log(json);
        return json;
    };


    this.addModifier =function (modifier, option, index){
        var val = _.where(thisController.cartItems[thisController.selectedCartItemIndex].modifier_types, {modifier_option: option.option});
        if( val.length > 0){
            // thisController.cartItems[thisController.selectedCartItemIndex].modifier_types[index].modifier_option = option;
        }
        else{
            thisController.cartItems[thisController.selectedCartItemIndex].modifier_types.push({
            modifier_id : modifier.id,
            modifier_name : modifier.modifier_name,
            modifier_option : option.option,
            price_alt: option.priceAlt
            });

            thisController.cartItems[thisController.selectedCartItemIndex].cost = thisController.cartItems[thisController.selectedCartItemIndex].cost + option.priceAlt;
            console.log(thisController.cartItems[thisController.selectedCartItemIndex].cost);
                        console.log(thisController.cartItems[thisController.selectedCartItemIndex].modifier_types);
        }  

    };

    this.reset = function(){
                thisController.cartItems = []; //array of items added to the. cart
              thisController.productModifiers =[]; //array to temporary hold modifiers of selected cart item which is displayed in a modal
              thisController.options =[];
              thisController.selectedCustomerId;
              thisController.selectedCustomer = {
                id:0,
                name: '',
                phone:'',
                default_location:'',
              };
              thisController.selectedOrderType = 'walk in';
              thisController.selectedOrder ={};
              thisController.openCartItem = '';
              thisController.hidethis = true;
              thisController.subtotal = 0.0;
              thisController.orderBeingEdited ={
                id : '',
              };
                thisController.savedOrder ={id:"1"};
              thisController.deleted_ids = [];
              thisController.orderState = 'addOrder';
              thisController.amountPaid = 0.00;
              thisController.selectedCartItem ={};
              thisController.selectedCartItemModifiers = []; 
              thisController.deliveryCharge = 0.00; 

        };

    this.createNewCustomer = function(){

        if(thisController.newCustomer.name.length > 0){
          var request = {
                method: 'PUT',
                url: $rootScope.apiUrl + '/add_customer/'+ thisController.newCustomer.name +'/'+ thisController.newCustomer.phone +'/'+ thisController.newCustomer.location +'/'+ thisController.newCustomer.email +'/'+ thisController.selectedStore.id ,
                // url: '../../web/js/dummydata.json',
                headers: {
                'appkey' : JAPPKEY
                },

                };
        
            $http(request).then(function(response){
            if ((response.status)=="200"){
                thisController.selectedCustomer = response["data"];
                console.log(thisController.selectedCustomer);
                ModalService.Close('newCustomer');
                ToastService.success('New customer saved');
                thisController.loadCustomers();
                
            }
            else{
                console.log("no");
            }
        });

        }
        else{
            ToastService.error('Customer name must be added');
        }

        }

    this.change = function(total,amount){
        if(amount > total){
          return (amount - total).toFixed(2);
        }
        return 0.00;
      };

    this.closeModifierPopUp = function(){

        ModalService.Close('modifier-popup');
    };

    this.removeModifierOption = function(index){

              // console.log(thisController.cartItems[thisController.selectedCartItemIndex].modifier_types[index]);

       
        thisController.cartItems[thisController.selectedCartItemIndex].cost = thisController.cartItems[thisController.selectedCartItemIndex].cost - thisController.cartItems[thisController.selectedCartItemIndex].modifier_types[index].price_alt;

         thisController.cartItems[thisController.selectedCartItemIndex].modifier_types.splice(index,1);

        // console.log(thisController.cartItems[thisController.selectedCartItemIndex].cost);
    };

    this.closeCustomerForm = function(){
        thisController.newCustomer = {
            name: null,
            phone: null,
            location: null,
            email: null
        }

        ModalService.Close('newCustomer');
    };


    this.openEditCustomer = function(){
         $(".bubble-form").toggle();
    }

    this.inCustomersDropdownCheck = function(target){

                if (!target.closest('.customer-details').length ) {
            thisController.hidethis = true;  
            $('.customer-search-dropdown').hide();
       }
       else{
        $('.customer-search-dropdown').show();
       }
    }

    this.inEditCustomerBubbleFormCheck = function(target){

        if (!target.closest('.edit-customer-outer-container').length) {

            $('.bubble-form').hide();
       }
    }


    this.addCustomModifier = function(){
    if(thisController.customModifierPrice == '' || thisController.customModifierPrice == null){
       thisController.customModifierPrice =  0;
    }
    if(thisController.customModifier != '' && thisController.customModifierPrice > 0){
    thisController.cartItems[thisController.selectedCartItemIndex].modifier_types.push({
    modifier_id : 0,
    modifier_name : '',
    modifier_option : thisController.customModifier,
    price_alt: parseFloat(thisController.customModifierPrice)
    });
        thisController.cartItems[thisController.selectedCartItemIndex].cost = thisController.cartItems[thisController.selectedCartItemIndex].cost + parseFloat(thisController.customModifierPrice);
    thisController.customModifier = '';
    thisController.customModifierPrice = null;
    }
    else{
        ToastService.error('No modifier name entered');
    }

    }

    this.printReceipt = function(){
        document.addEventListener('deviceready', function () {
           var page = document.getElementById('pos_page_receipt');
           cordova.plugins.printer.print(page, 'POS Receipt');

       }, false);
    }


jQuery(document).ready(function() {

    $(document).click(function (e) {
     var target = $(e.target);
     thisController.inCustomersDropdownCheck(target);
     thisController.inEditCustomerBubbleFormCheck(target);
    });
});

    

 }]);
        app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q) {
            return {
                'response': function (response) {
                    //Will only be called for HTTP up to 300
                    // console.log(response);
                    return response;
                },
                'responseError': function (rejection) {
                    if(rejection.status === 401) {
                        var message = "Error "+rejection.status+": API server error";
                         var x = document.getElementById("snackbar");
                        x.style.backgroundColor = "#BF6359";
                        x.innerHTML = "<span><img src='web/img/error_white.svg'></span>" + message;
                        x.className = "show";
                        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
                    }
                    return $q.reject(rejection);
                }
            };
        });
    }]);


