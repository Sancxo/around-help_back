require "test_helper"

class NeedUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @need_user = need_users(:one)
  end

  test "should get index" do
    get need_users_url, as: :json
    assert_response :success
  end

  test "should create need_user" do
    assert_difference("NeedUser.count") do
      post need_users_url, params: { need_user: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show need_user" do
    get need_user_url(@need_user), as: :json
    assert_response :success
  end

  test "should update need_user" do
    patch need_user_url(@need_user), params: { need_user: {  } }, as: :json
    assert_response :success
  end

  test "should destroy need_user" do
    assert_difference("NeedUser.count", -1) do
      delete need_user_url(@need_user), as: :json
    end

    assert_response :no_content
  end
end
