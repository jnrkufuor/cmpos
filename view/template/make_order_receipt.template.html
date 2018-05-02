<modal id="make-order-receipt">
    <div class="modal">

        <div class="modal-body" style="width:auto;">
            
        <img class="close-btn" src="web/img/close.svg" ng-click="pCtrl.closeCheckOut()">
         <div class="receipt-container" id="receipt-container">
             <div class="modal-header">Receipt</div>
             <div class="receipt-block" id="receipt-block">
                 <h1 class="receipt-header">Sale.no:{{pCtrl.savedOrder.id}}</h1>
                 <div class="receipt-order-info">
                     <p>Date:  {{pCtrl.savedOrder.date.date}}</p>
                     <p>OrderType:  {{pCtrl.savedOrder.type_of_order}}</p>
                     <p>Customer:  {{pCtrl.selectedCustomer.name}} - {{pCtrl.selectedCustomer.phone}} - {{pCtrl.selectedCustomer.default_location}}</p>
                 </div>
                 <table class="uk-table uk-table-divider receipt-cart-table">
    <thead>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="item in pCtrl.cartItems">
            <td>{{item.name}}</td>
            <td style="text-align:right">{{item.qty}}</td>
            <td>GH₵ {{item.cost * item.qty | number:2}}</td>
        </tr>
    </tbody>
</table>
        <div class="order-charge-summary">
            <div class="order-charge-summary-entry"><span class="receipt-title">Subtotal</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;" /></span><span class="receipt-summary-value">GH₵ {{pCtrl.subtotal}}</span></div>

          <div class="order-charge-summary-entry"><span class="receipt-title">Discount</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;" /></span><span class="receipt-summary-value">GH₵ 0.00</span></div>

          <div class="order-charge-summary-entry"><span class="receipt-title">Tax</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;" /></span><span class="receipt-summary-value">GH₵ 0.00</span></div>

          <div ng-if="pCtrl.selectedOrderType == 'delivery'" class="order-charge-summary-entry"><span class="receipt-title">Delivery</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;" /></span><span class="receipt-summary-value">GH₵ {{pCtrl.deliveryCharge | number:2}}</span></div>


      <div class="order-charge-summary-entry"><span class="receipt-title">Total</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;" /></span><span style="font-weight: bold" class="receipt-summary-value">GH₵ {{pCtrl.total() + pCtrl.deliveryCharge | number:2}}</span></div>

      <hr  ng-if="pCtrl.selectedOrderType == 'walk in'" style="width:calc(100% - 20px); margin: 10px 0px;" />

      <div ng-if="pCtrl.selectedOrderType == 'walk in'" class="order-charge-summary-entry"><span style="width:85px"class="receipt-title">Amount paid</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;width:90px" /></span><span style="font-weight: bold" class="receipt-summary-value">GH₵ {{pCtrl.amountPaid | number:2}}</span></div>



      <div ng-if="pCtrl.selectedOrderType == 'walk in'" class="order-charge-summary-entry"><span class="receipt-title">Change</span><span class="receipt-dotted-line-container"><hr  class="receipt-dotted-line" style="border-top: dotted 1px;" /></span><span style="font-weight: bold" class="receipt-summary-value">GH₵ {{pCtrl.change(pCtrl.total(),pCtrl.amountPaid) | number:2}}</span></div>

        </div>
             </div>
                     <div  class="modal-button-container" ng-if="pCtrl.selectedOrderType != 'walk in'">
    
              <button class="cancel-button" ng-click="pCtrl.closeCheckOut()" onclick="printJS({ printable: 'receipt-block', type: 'html'})"><span  uk-icon="icon:  album; ratio: 1"></span>Print</button>
        </div>

        </div>
        <div class="check-out-info-block" ng-if="pCtrl.selectedOrderType == 'walk in'">
        <div class="modal-header">Checkout</div>
        <div class="modal-content checkout-amount-paid-container">
            <div style="font-size:20px;text-align:right;color:white;    margin-bottom: 10px;">GH₵</div>
            <div style="text-align:left"><h1><p>Amount to be paid</p>{{pCtrl.total() | number:2}}</h1></div>
        </div>
        <div class="modal-content">
            <div style="width: 125px;
    padding-right: 5px;display: inline-block;">
            <h1>Amount Paid</h1>
            <div><input  class="modal-text-input" type="text" placeholder="0.00" type="number"  id="openBalance" ng-model="pCtrl.amountPaid"></div>
        </div>
         <div style="width: 125px;display: inline-block;">
            <h1>Change</h1>
            <div><input  class="modal-text-input" type="text" type="number"  id="openBalance" value="GH₵ {{pCtrl.change(pCtrl.total(),pCtrl.amountPaid)}}"></div>
        </div>
        </div>
            <div class="modal-content">
            <h1>Payment method</h1>
            <select ng-model="pCtrl.paymentMethod" class="uk-select">
                    <option>Cash</option>
                    <option>Credit</option>
            </select>
        </div>
        <div  class="modal-button-container">
            <
              <button class="cancel-button" ng-click="pCtrl.closeCheckOut()" onclick="printJS({ printable: 'receipt-container', type: 'html'})"><span  uk-icon="icon:  album; ratio: 1"></span>Print</button>
              <button class="cancel-button" ng-click="pCtrl.closeOrder(pCtrl.savedOrder.id,pCtrl.amountPaid,false)" ><span  uk-icon="icon: arrow-right; ratio: 1"></span>Checkout</button>

            <button class="save-button" ng-click="pCtrl.closeOrder(pCtrl.savedOrder.id,pCtrl.amountPaid, true )"  onclick=""><span  uk-icon="icon: cart; ratio: 1"></span> Checkout & Print Receipt</button>
        </div>
        </div>

    </div>
    </div>
    <div class="modal-background" ng-click="pCtrl.reset()"></div>
</modal>