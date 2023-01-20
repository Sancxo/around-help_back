require "test_helper"

class NeedsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @need = needs(:one)
  end

  test "should get index" do
    get needs_url, as: :json
    assert_response :success
  end

  test "should create need" do
    assert_difference("Need.count") do
      post needs_url, params: { need: { address_id: @need.address_id, description: @need.description, is_fulfilled: @need.is_fulfilled, is_one_time: @need.is_one_time, title: @need.title } }, as: :json
    end

    assert_response :created
  end

  test "should show need" do
    get need_url(@need), as: :json
    assert_response :success
  end

  test "should update need" do
    patch need_url(@need), params: { need: { address_id: @need.address_id, description: @need.description, is_fulfilled: @need.is_fulfilled, is_one_time: @need.is_one_time, title: @need.title } }, as: :json
    assert_response :success
  end

  test "should destroy need" do
    assert_difference("Need.count", -1) do
      delete need_url(@need), as: :json
    end

    assert_response :no_content
  end
end
