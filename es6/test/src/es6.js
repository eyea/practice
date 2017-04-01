const money = n => ('' + n).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
