<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    
     public function up()
     {
         Schema::create('campaigns', function (Blueprint $table) {
             $table->id();
             $table->foreignId('admin_id')->constrained()->onDelete('cascade');
             $table->string('name');
             $table->text('description')->nullable();
             $table->decimal('target_amount', 10, 2);
             $table->date('end_date');
             $table->timestamps();
         });
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
};
