<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\MindicadorApiService;
Use \Carbon\Carbon;

class MoneyController extends Controller
{
    protected $mindicadorApiService;

    public function __construct(MindicadorApiService $mindicadorApiService)
    {
        $this->mindicadorApiService = $mindicadorApiService;
    }

     /**
     * Entrega los valores del dolar según el rango de fecha estandar definido (30 días).
     *
     * @return \Illuminate\Http\Response
     */
    public function getStandarMoneyByDateRange()
    {
        $startDate = Carbon::now()->subDays(30);
        $endDate = Carbon::now();
        $prices = $this->getDollarPrices($startDate, $endDate);
        return response()->json($prices);
    }

    /**
     * Entrega los valores del dolar según el rango de fecha ingresado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getMoneyByDateRange(Request $request)
    {
        $request->validate([
            'start_date' => 'required',
            'end_date' => 'required|after_or_equal:start_date',
        ]);
        $startDate = $request->input('start_date');
        $startDate =  Carbon::parse($startDate)->format('Y-m-d');
        $endDate = $request->input('end_date');
        $endDate =  Carbon::parse($endDate)->format('Y-m-d');
        $prices = $this->getDollarPrices($startDate, $endDate);
        return response()->json($prices);
    }

    /**
     * Entrega los valores del dolar según el rango de fecha ingresado. Formatea las fecha y precio.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getDollarPrices($startDate, $endDate)
    {
        $startYear = date('Y', strtotime($startDate));
        $endYear = date('Y', strtotime($endDate));

        $prices = [];

        for ($year = $startYear; $year <= $endYear; $year++) {
            $response = $this->getDollarByYear($year);
            if ($response->successful()) {
                $data = $response->json()['serie'];

                foreach ($data as $item) {
                    $date = date('Y-m-d', strtotime($item['fecha']));
                    $price = $item['valor'];

                    if ($date >= $startDate && $date <= $endDate) {
                        $prices[] = [
                            'date' => $date,
                            'price' => $price,
                        ];
                    }
                }
            }
        }
        return $prices;
    }

    /**
     * Obtiene los valores del dolar según el año ingresado.
     *
     * @param  int  $year
     * @return \Illuminate\Http\Response
     */
    public function getDollarByYear($year)
    {
        $data = $this->mindicadorApiService->getDollarsByDate($year);
        return $data;
    }
}
