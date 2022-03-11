pragma solidity 0.8.7;

contract Information{
	uint public countPeople = 0; // khai báo một countPeople = 0 và công khai
	mapping (uint => People) public listPeople; // khai báo khởi tạo mảng listPeople để chứa các thông tin của người dùngdùng

	struct People{
		address addressPeople;	// Chứa địa chỉ public key của ví metaMask 
		uint   id;	// mã id với kiểu dữ liệu unit không âm
		string name; // khai báo họ và tên theo kiểu string
		string birthDay; // khai báo ngày sinh theo kiểu string
		string sex; 	// khai báo giới tính theo kiểu string
		string numberCccd; // khai báo công cước công dân hoặc chứng minh nhân dân theo kiểu string
		string phone; // khai báo số điện thoại theo kiểu string
		string numberHome; 	// khai báo số nhà theo kiểu string
		string ward; // khai báo phường/ xã theo kiểu string
		string district; // khai báo quận huyện theo kiểu string
		string city;  	// khai báo tính, thành phố theo kiểu string
		uint injected; // khai báo đã tiêm bao nhiêu mũi với kiểu dữ liệu không âm là uint
		dataVacin datavacin;	// lưu dữ liệu mũi tiêm của người dùng
	}

	struct Input{	// Chứa dữ liệu người dùng gọi từ bên web3web3
		string name;
		string birthDay;
		string sex;
		string numberCccd;
		string phone;
		string numberHome;
		string ward; 
		string district; 
		string city; 
		uint injected; 
		dataVacin datavacin;
	}
	
	struct dataVacin { //chứa dữ liệu vacsin
		string dateInjection1;
		string typeVacin1;
		string dateInjection2;
		string typeVacin2;
		string dateInjection3;
		string typeVacin3;
		string dateInjection4;
		string typeVacin4;
		string dateInjection5;
		string typeVacin5;

	}

	function Add(Input memory input) public {	// Hàm thêm
		bool check = true;		// khởi tạo biến này dùng để mậc định có thể thêm hồ sơ vào
		for(uint i = 0; i < countPeople; i++){	// duyệt toàn bộ phần từ của mảng listPeople
			if(compareStrings(listPeople[i].numberCccd, input.numberCccd)){	//nếu tìm thấy công cước công dân thì gán check = false và hủy vòng lặplặp
				check = false;
				break;
			}
		}

		if(check){	// Nếu check đúng thì thêm vào mảng và tăng biến countPeople lên 1
			People memory people = People(msg.sender,	
									countPeople,
									input.name,
									input.birthDay,
									input.sex,
									input.numberCccd,
									input.phone,
									input.numberHome,
									input.ward,
									input.district,
									input.city,
									input.injected,
									input.datavacin
									);
			listPeople[countPeople] = people;
			countPeople++;
		}
	}

	function edit(Input memory input, uint id) public { // Hàm chỉnh sửa 
		People memory people = People(msg.sender,	// Khai báo và ghi đè phần tử dựa vào id
									id,
									input.name,
									input.birthDay,
									input.sex,
									input.numberCccd,
									input.phone,
									input.numberHome,
									input.ward,
									input.district,
									input.city,
									input.injected,
									input.datavacin
									);
			listPeople[id] = people; // lấy phần từ mảng thứ id của mảng listPeople và ghi đè phần từ people mới
	}

	function search(string memory q) public view returns (People[] memory){ // hàm tìm kiếm
        People[] memory result_list = new People[](10);	// khởi tạo một cái mảng People chứ 10 phần tửtử
        uint _count = 0; // gán _count = 00
        for(uint i = 0; i < countPeople; i++){ // duyệt tất cả các phần từ của mảng listPeople
            if(compareStrings(listPeople[i].numberCccd, q)) {	// so sánh căn cước công dân có trùng với từ khóa tìm kiếm( q lấy từ frontend)
                result_list[_count] = listPeople[i];	//nếu đúng thêm hồ sơ đó vào mảng result_list
                _count++; 	// tăng biến _count lên 1
            }
        }
        return result_list;
    }

	function compareStrings(string memory a, string memory b) public view returns (bool) { // so sánh 2 string thêm khảo từ stackoverflow nếu đúng trả true
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b)))); 
    }

}

