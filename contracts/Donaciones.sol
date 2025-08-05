// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donaciones {
    address public owner;
    mapping(address => uint) public donaciones;

    event DonacionRecibida(address indexed donante, uint cantidad);

    constructor() {
        owner = msg.sender;
    }

    function donar() public payable {
        require(msg.value > 0, "La donacion debe ser mayor a 0");
        donaciones[msg.sender] += msg.value;
        emit DonacionRecibida(msg.sender, msg.value);
    }

    function obtenerBalance() public view returns (uint) {
        return address(this).balance;
    }

    function retirarFondos(uint cantidad) public {
        require(msg.sender == owner, "Solo el propietario puede retirar fondos");
        require(cantidad <= address(this).balance, "Fondos insuficientes");
        payable(owner).transfer(cantidad);
    }
}
