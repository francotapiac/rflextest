<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class MindicadorApiService
{
    protected $client;
    protected $apiUrl;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->apiUrl = config('services.external_api.url');
    }

    /**
     * Obtiene los valores del dolar por fecha a partir de la api.
     *
     * @param  int  $year
     * @return \Illuminate\Http\Response
     */
    public function getDollarsByDate($year)
    {
        $url = $this->apiUrl  . '/' . $year;
        $response = Http::get($url);
        return $response;
    }
}