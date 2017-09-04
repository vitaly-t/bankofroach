//BALANCES
function display_accounts() {
	$.get("/api/balances").then(function(r) {

		if(r.length === 0){
			$('#more-money').hide();
			return;
		} else {
			$('#accounts').html('');
			$('#more-money').show();

			let accounts_div = document.getElementById('accounts');

			accounts_table = document.createElement('table');
			accounts_table.setAttribute('class', 'table table-bordered table-striped');

			table_header = document.createElement('thead');
			accounts_table.appendChild(table_header);

			header_row = document.createElement('tr');
			header_row.setAttribute('class', 'accounts-header-row');
			table_header.appendChild(header_row);

			name_header = document.createElement('th');
			name_header.innerHTML = 'Name';
			header_row.appendChild(name_header);

			balance_header = document.createElement('th');
			balance_header.innerHTML = 'Balance';
			header_row.appendChild(balance_header);

			table_body = document.createElement('tbody');
			accounts_table.appendChild(table_body);

			jQuery.each(r, function( k, v ) {

				body_row = document.createElement('tr');

				row_name = document.createElement('td');
				row_name.innerHTML = v.name;

				body_row.appendChild(row_name);

				row_balance = document.createElement('td');
				row_balance.innerHTML = v.balance;

				body_row.appendChild(row_balance);

				table_body.appendChild(body_row);

			});
			
			accounts_div.appendChild(accounts_table);

		}

	});
}

//MORE
$('#more-money').click(function (e) {
	$.post("/api/more-money").then(function(r) {
	display_accounts();
	});
});


$(document).ready(function() {

	display_accounts();

});