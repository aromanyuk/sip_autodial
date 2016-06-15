package main

import (
    "fmt"
    "log"
    "net"
)

func main() {
    
    const (
        host string = "localhost"
        port string = "3002"
        service string = host + ":" + port
    )
    
    udpAddr, err := net.ResolveUDPAddr("udp4", service)
    
    if err != nil {
        log.Fatal(err)
    }
    
    ln, err := net.ListenUDP("udp", udpAddr)
    
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Println("UDP server listening on port ", port)
    
    defer ln.Close()
    
    for {
        handleUDPConnection(ln)
    }
}

func handleUDPConnection(conn *net.UDPConn) {
    
    buffer := make([]byte, 1024)
    
    n, addr, err := conn.ReadFromUDP(buffer)
    
    fmt.Println("UDP client", addr)
    msg := string(buffer[:n])
    fmt.Println("Received from UDP client: ", msg)
    
    if err != nil {
        log.Fatal(err);
    }
    
    /**
    * TODO: process service requests
    */
    
    message := []byte("Done")
    _, err = conn.WriteToUDP(message, addr)
    
    if err != nil {
        log.Println(err)
    }
    
}